import { CustomHelpers, ErrorReport } from "joi";

export default function validateCPF(
  value: string,
  helpers: CustomHelpers
): string | ErrorReport {
  const cpf = value.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11) {
    return helpers.error("string.length");
  }

  // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) {
    return helpers.error("any.invalid");
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return helpers.error("any.invalid");
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return helpers.error("any.invalid");
  }

  return value;
}
