/**
 * Reusable form validators. Each returns `null` if valid, or a user-facing
 * error message (Portuguese) if invalid.
 */

export type ValidationResult = string | null;

export const required = (value: string | undefined | null, label = 'Campo'): ValidationResult => {
  if (!value || !value.toString().trim()) {
    return `${label} é obrigatório.`;
  }
  return null;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validateEmail = (value: string): ValidationResult => {
  const r = required(value, 'Email');
  if (r) return r;
  if (!EMAIL_REGEX.test(value.trim())) {
    return 'Email inválido. Use o formato nome@dominio.com';
  }
  return null;
};

export const validatePassword = (value: string, label = 'Senha'): ValidationResult => {
  const r = required(value, label);
  if (r) return r;
  if (value.length < 8) {
    return `${label} precisa ter ao menos 8 caracteres.`;
  }
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return `${label} precisa conter letras e números.`;
  }
  return null;
};

/**
 * Validates DD/MM/YYYY birth date.
 * Rejects: invalid format, impossible date, future date, age < 1 or > 120.
 */
export const validateBirthDateBR = (value: string): ValidationResult => {
  const r = required(value, 'Data de nascimento');
  if (r) return r;
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return 'Use o formato DD/MM/YYYY.';
  }
  const [dd, mm, yyyy] = value.split('/').map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  if (
    date.getFullYear() !== yyyy ||
    date.getMonth() !== mm - 1 ||
    date.getDate() !== dd
  ) {
    return 'Data inexistente.';
  }
  const today = new Date();
  if (date > today) return 'Data não pode estar no futuro.';
  const ageYears = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  if (ageYears > 120) return 'Data muito antiga.';
  return null;
};

/**
 * CPF validation with check digits. Accepts formatted (000.000.000-00) or raw.
 */
export const validateCPF = (value: string): ValidationResult => {
  const r = required(value, 'CPF');
  if (r) return r;
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 11) return 'CPF deve ter 11 dígitos.';
  if (/^(\d)\1{10}$/.test(digits)) return 'CPF inválido.';
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(digits[i]) * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== Number(digits[9])) return 'CPF inválido.';
  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(digits[i]) * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  if (d2 !== Number(digits[10])) return 'CPF inválido.';
  return null;
};

export const validateCardNumber = (value: string): ValidationResult => {
  const r = required(value, 'Número do cartão');
  if (r) return r;
  const digits = value.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) {
    return 'Número de cartão inválido.';
  }
  // Luhn
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  if (sum % 10 !== 0) return 'Número de cartão inválido.';
  return null;
};

export const validateCardExpiry = (value: string): ValidationResult => {
  const r = required(value, 'Validade');
  if (r) return r;
  if (!/^\d{2}\/\d{2}$/.test(value)) return 'Use o formato MM/AA.';
  const [mm, yy] = value.split('/').map(Number);
  if (mm < 1 || mm > 12) return 'Mês inválido.';
  const now = new Date();
  const expiry = new Date(2000 + yy, mm - 1 + 1, 0); // last day of expiry month
  if (expiry < now) return 'Cartão vencido.';
  return null;
};

export const validateCVV = (value: string): ValidationResult => {
  const r = required(value, 'CVV');
  if (r) return r;
  const digits = value.replace(/\D/g, '');
  if (digits.length < 3 || digits.length > 4) return 'CVV deve ter 3 ou 4 dígitos.';
  return null;
};

/**
 * Convert a per-field validators map into the first error, or null if all valid.
 */
export const runValidators = (
  validators: Record<string, () => ValidationResult>
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  for (const [field, validator] of Object.entries(validators)) {
    const err = validator();
    if (err) errors[field] = err;
  }
  return { valid: Object.keys(errors).length === 0, errors };
};
