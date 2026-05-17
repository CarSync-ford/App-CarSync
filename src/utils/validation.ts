/** Valida formato de e-mail */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Aplica máscara CPF: 000.000.000-00 */
export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/** Valida CPF usando os dois dígitos verificadores */
export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false; // sequências iguais (111.111.111-11)

  const calc = (factor: number) => {
    let sum = 0;
    for (let i = 0; i < factor - 1; i++) {
      sum += parseInt(digits[i]) * (factor - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 || rest === 11 ? 0 : rest;
  };

  return calc(10) === parseInt(digits[9]) && calc(11) === parseInt(digits[10]);
}

/** Valida força da senha:
 *  - mínimo 8 caracteres
 *  - pelo menos 1 letra maiúscula
 *  - pelo menos 1 letra minúscula
 *  - pelo menos 1 número
 *  - pelo menos 1 caractere especial
 */
export function isValidPassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8)
    return { valid: false, message: 'Mínimo de 8 caracteres.' };
  if (!/[A-Z]/.test(password))
    return { valid: false, message: 'Deve conter pelo menos uma letra maiúscula.' };
  if (!/[a-z]/.test(password))
    return { valid: false, message: 'Deve conter pelo menos uma letra minúscula.' };
  if (!/[0-9]/.test(password))
    return { valid: false, message: 'Deve conter pelo menos um número.' };
  if (!/[^A-Za-z0-9]/.test(password))
    return { valid: false, message: 'Deve conter pelo menos um caractere especial.' };
  return { valid: true, message: '' };
}
