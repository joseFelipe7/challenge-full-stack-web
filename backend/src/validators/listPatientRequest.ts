import joi from "joi";

export default joi.object().keys({
  filter: joi.object({
    name: joi.string(),
    phone: joi.string(),
    document: joi.string(),
    email: joi.string(),
  }),
  page: joi.string().pattern(/^[0-9]+$/),
  per_page: joi.string().pattern(/^[0-9]+$/),
});
