/**
 * authService.ts
 * Serviços de autenticação do CarSync.
 *
 * Mudanças de segurança:
 * - Persiste o JWT no expo-secure-store (criptografado) em vez do AsyncStorage.
 * - Usa parseApiError para extrair mensagens amigáveis do DTO de erro padrão.
 */

import { setSecureItem } from '@/src/utils/secureStorage';
import { apiFetch } from './api';
import { IRegisterPayload, IRegisterResponse } from '@/src/types/register';
import { ILoginPayload, ILoginResponse } from '@/src/types/login';
import { parseApiError } from '@/src/utils/errorHandler';

const SECURE_KEY_TOKEN = 'auth_token';

// ─── Registro ─────────────────────────────────────────────────────────────────

export async function registerUser(payload: IRegisterPayload): Promise<IRegisterResponse> {
  const response = await apiFetch('/api/v1/user', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(parseApiError(data, 'Erro ao realizar o cadastro.'));
  }

  return data;
}

// ─── Login ────────────────────────────────────────────────────────────────────

export async function loginUser(payload: ILoginPayload): Promise<ILoginResponse> {
  const response = await apiFetch('/api/v1/auth', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(parseApiError(data, 'E-mail ou senha incorretos.'));
  }

  // Persiste o token de forma criptografada
  await setSecureItem(SECURE_KEY_TOKEN, data.token);

  return data;
}

// ─── Dados do usuário logado ───────────────────────────────────────────────────

export async function getMe(): Promise<{ username: string }> {
  const response = await apiFetch('/api/v1/user/me');

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(parseApiError(data, 'Não autorizado.'));
  }

  return data;
}
