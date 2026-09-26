/**
 * useFormValidation.ts
 * Schemas Zod para validação client-side dos formulários de Login e Registro.
 * Integra com as regras existentes de CPF e senha do projeto.
 */
import { z } from 'zod';
import { isValidEmail, isValidCPF, isValidPassword } from '@/src/utils/validation';

// ─── Schema de Login ──────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório.')
    .refine(isValidEmail, 'Informe um e-mail válido.'),
  senha: z
    .string()
    .min(1, 'Senha é obrigatória.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ─── Schema de Registro ───────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    nome: z
      .string()
      .min(1, 'Nome é obrigatório.')
      .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
    email: z
      .string()
      .min(1, 'E-mail é obrigatório.')
      .refine(isValidEmail, 'Informe um e-mail válido.'),
    cpf: z
      .string()
      .min(1, 'CPF é obrigatório.')
      .refine(isValidCPF, 'CPF inválido.'),
    senha: z
      .string()
      .min(1, 'Senha é obrigatória.')
      .refine(
        (val) => isValidPassword(val).valid,
        (val) => ({ message: isValidPassword(val).message })
      ),
    confirmarSenha: z.string().min(1, 'Confirme a senha.'),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem.',
    path: ['confirmarSenha'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Valida um objeto com o schema de login.
 * Retorna { success: true } ou { success: false, errors: Record<string, string> }
 */
export function validateLoginForm(data: LoginFormData):
  | { success: true }
  | { success: false; errors: Partial<Record<keyof LoginFormData, string>> } {
  const result = loginSchema.safeParse(data);
  if (result.success) return { success: true };

  const errors: Partial<Record<keyof LoginFormData, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof LoginFormData;
    if (!errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}

/**
 * Valida um objeto com o schema de registro.
 * Retorna { success: true } ou { success: false, errors: Record<string, string> }
 */
export function validateRegisterForm(data: RegisterFormData):
  | { success: true }
  | { success: false; errors: Partial<Record<keyof RegisterFormData, string>> } {
  const result = registerSchema.safeParse(data);
  if (result.success) return { success: true };

  const errors: Partial<Record<keyof RegisterFormData, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof RegisterFormData;
    if (!errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}
