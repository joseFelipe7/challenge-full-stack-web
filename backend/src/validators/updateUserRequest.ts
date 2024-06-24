import joi from "joi"

export default joi.object().keys({
                  id:joi.string().required(),
                  name:    joi.string().min(6).max(100),
                  password:joi.string()
                            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)
                            .messages({'string.pattern.base': 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número, com pelo menos 6 caracteres.'})                
                })