/**
 * api.ts
 * Camada de fetch centralizada do CarSync.
 *
 * Funcionalidades:
 * - Valida que a baseURL usa HTTPS (aviso em desenvolvimento).
 * - Lê o JWT do SecureStore e envia no header Authorization.
 * - Retry automático com exponential backoff para respostas 429 (Too Many Requests).
 * - Detecta respostas 401 / 403 / 423 e dispara logout forçado via authEvents.
 * - Lança erros com mensagem amigável extraída do DTO padrão da API.
 */

import { getSecureItem } from '@/src/utils/secureStorage';
import { authEvents } from '@/src/utils/authEvents';
import { parseApiError } from '@/src/utils/errorHandler';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import encBase64 from 'crypto-js/enc-base64';

// ─── Configuração ──────────────────────────────────────────────────────────────

const BASE_URL = process.env.EXPO_PUBLIC_API?.replace(/\/$/, '') ?? '';

// Em produção, isso viria de variáveis de ambiente seguras (.env)
const HMAC_SECRET = process.env.EXPO_PUBLIC_HMAC_SECRET ?? '';

// Avisa se a URL não for HTTPS (apenas em desenvolvimento)
if (__DEV__ && BASE_URL && !BASE_URL.startsWith('https://')) {
  console.warn(
    `[api] ⚠️  EXPO_PUBLIC_API não usa HTTPS: "${BASE_URL}". ` +
    'Em produção, a URL DEVE começar com https://'
  );
}

// ─── Constantes de Retry ───────────────────────────────────────────────────────

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500; // 500ms → 1000ms → 2000ms

/** HTTP status codes que disparam logout forçado */
const FORCE_LOGOUT_STATUSES = new Set([401, 403, 423]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Aguarda `ms` milissegundos */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Calcula o delay de backoff exponencial com jitter */
function backoffDelay(attempt: number): number {
  const exp = BASE_DELAY_MS * Math.pow(2, attempt);      // 500 | 1000 | 2000
  const jitter = Math.random() * 200;                    // até +200ms aleatório
  return Math.min(exp + jitter, 8000);                   // teto em 8s
}

// ─── apiFetch ─────────────────────────────────────────────────────────────────

/**
 * Wrapper de fetch com todas as funcionalidades de segurança e resiliência.
 *
 * @param path   Caminho relativo à API (ex: '/api/v1/user')
 * @param options Opções nativas do fetch (method, body, headers, etc.)
 */
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const url = `${BASE_URL}${path}`;

  // Lê o token do armazenamento seguro
  const token = await getSecureItem('auth_token');

  const buildHeaders = (): HeadersInit => {
    let payloadToSign = '';

    const method = options?.method?.toUpperCase() || 'GET';
    const body = options?.body;

    if (method === 'GET' || !body) {
      // Para GET (ou sem body), assina a URL relativa (ex: /api/v1/users?query=1)
      // O argumento 'path' já contém o caminho relativo a partir do base url
      payloadToSign = path;
    } else {
      // Para POST/PUT com body, assina o body
      payloadToSign = typeof body === 'string' ? body : JSON.stringify(body);
    }
    
    // Gera a assinatura HMAC-SHA256 e encoda para Base64
    const signature = HmacSHA256(payloadToSign, HMAC_SECRET).toString(encBase64);

    return {
      'Content-Type': 'application/json',
      'X-HMAC-Signature': signature,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    };
  };

  let attempt = 0;

  while (true) {
    const response = await fetch(url, {
      ...options,
      headers: buildHeaders(),
    });

    // ── 429 Too Many Requests: retry com backoff ──────────────────────────────
    if (response.status === 429 && attempt < MAX_RETRIES) {
      // Respeita o header Retry-After se existir
      const retryAfter = response.headers.get('Retry-After');
      const waitMs = retryAfter
        ? parseInt(retryAfter, 10) * 1000
        : backoffDelay(attempt);

      if (__DEV__) {
        console.warn(
          `[api] 429 Too Many Requests. Tentativa ${attempt + 1}/${MAX_RETRIES}. ` +
          `Aguardando ${Math.round(waitMs)}ms...`
        );
      }

      await sleep(waitMs);
      attempt++;
      continue;
    }

    // ── 401 / 403 / 423: logout forçado ──────────────────────────────────────
    if (FORCE_LOGOUT_STATUSES.has(response.status)) {
      if (__DEV__) {
        console.warn(`[api] Status ${response.status} recebido → disparando logout forçado.`);
      }
      // Clona a resposta antes de consumir o body (para não bloquear o chamador)
      response.clone().json().catch(() => null).then((data) => {
        const message = parseApiError(data, 'Sessão expirada. Faça login novamente.');
        if (__DEV__) console.warn('[api] Mensagem de logout forçado:', message);
      });
      authEvents.emitForceLogout();
    }

    return response;
  }
}
