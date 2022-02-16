const Joi = require("joi");

const loginSkeleton = {
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
};

const registerSkeleton = {
  name: Joi.string().alphanum().required(),
  ...loginSkeleton,
  biz: Joi.boolean().default(false),
};
const loginSchema = Joi.object(loginSkeleton);
const registerSchema = Joi.object(registerSkeleton);

module.exports = {
  loginSchema,
  registerSchema,
};
