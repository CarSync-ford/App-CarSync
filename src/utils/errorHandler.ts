/**
 * errorHandler.ts
 * Parse centralizado do DTO de erro padrão da API CarSync.
 *
 * Formato esperado:
 * {
 *   "timestamp": "...",
 *   "status": 400,
 *   "error": "Bad Request",
 *   "message": "Email já cadastrado",
 *   "path": "/api/v1/user",
 *   "details": []
 * }
 */

export interface ApiErrorDto {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  details?: string[];
}

/**
 * Extrai uma mensagem de erro amigável em português a partir do DTO da API.
 * Fallback para mensagem genérica caso o DTO esteja malformado.
 */
export function parseApiError(data: unknown, fallback = 'Ocorreu um erro inesperado.'): string {
  if (!data || typeof data !== 'object') return fallback;

  const dto = data as ApiErrorDto;

  // Prioridade: details (erros específicos) → message → error → fallback
  if (dto.details && dto.details.length > 0) return dto.details[0];
  if (dto.message && dto.message.trim()) return dto.message.trim();
  if (dto.error && dto.error.trim()) return dto.error.trim();

  return fallback;
}

/**
 * Lê o corpo JSON de um Response e extrai a mensagem de erro.
 * Retorna o fallback caso o JSON seja inválido.
 */
export async function parseResponseError(
  response: Response,
  fallback = 'Ocorreu um erro inesperado.'
): Promise<string> {
  try {
    const data = await response.json();
    return parseApiError(data, fallback);
  } catch {
    return fallback;
  }
}
