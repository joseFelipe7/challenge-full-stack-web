import { validateCPF } from "@/utils";
import joi from "joi";

export default joi.object().keys({
  name: joi.string().min(6).max(100).required(),
  phone: joi.string().min(10).max(11).required(),
  birthdate: joi.date().max("now").required().messages({
    "date.max": "A data de nascimento não pode ser maior que a data de hoje.",
    "any.required": "A data é obrigatória.",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O email deve ser válido.",
    "any.required": "O email é obrigatório.",
  }),
  document: joi.string().custom(validateCPF).required().messages({
    "any.required": "O CPF é obrigatório.",
    "string.length": "CPF deve conter 11 dígitos.",
    "any.invalid": "CPF inválido.",
  }),
  gender: joi.string().valid("Female", "Male").required().messages({
    "any.only": 'O gênero deve ser "Female" ou "Male".',
    "any.required": "O gênero é obrigatório.",
  }),
});
