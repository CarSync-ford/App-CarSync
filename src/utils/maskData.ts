/**
 * maskData.ts
 * Utilitários para exibir dados sensíveis parcialmente ocultos na UI.
 * Usado para renderizar dados que chegam da API de forma segura.
 */

/**
 * Mascara um endereço de e-mail.
 * Ex: "joao.silva@gmail.com" → "jo***@gmail.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

/**
 * Mascara um CPF para exibição.
 * Ex: "123.456.789-09" → "***.456.789-**"
 * Aceita CPF com ou sem máscara.
 */
export function maskCPFDisplay(cpf: string): string {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return '***.***.***-**';
  return `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**`;
}

/**
 * Mascara um número de telefone celular.
 * Ex: "11987654321" → "(11) 9****-4321"
 * Ex: "(11) 98765-4321" → "(11) 9****-4321"
 */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10) return '(**) ****-****';
  const ddd = digits.slice(0, 2);
  const suffix = digits.slice(-4);
  const firstDigit = digits[2];
  return `(${ddd}) ${firstDigit}****-${suffix}`;
}

/**
 * Mascara um nome, exibindo apenas o primeiro nome completo
 * e a inicial do último sobrenome.
 * Ex: "João Carlos Silva" → "João C."
 */
export function maskName(fullName: string): string {
  if (!fullName || !fullName.trim()) return '***';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}
