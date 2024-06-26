import joi from "joi";

export default joi.object().keys({
  id: joi.string().required(),
});
