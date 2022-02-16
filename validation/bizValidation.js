const Joi = require("joi");

const bizSkeleton = {
  bizName: Joi.string().required(),
  bizDescription: Joi.string().required(),
  bizLocation: Joi.string().required(),
  bizPhone: Joi.number().required(),
  bizPic: Joi.string().required(),
};
const updateSkeleton = {
  bizName: Joi.string(),
  bizDescription: Joi.string(),
  bizLocation: Joi.string(),
  bizPhone: Joi.number(),
  bizPic: Joi.string(),
};

const bizSchema = Joi.object(bizSkeleton);
const updateSchema = Joi.object(updateSkeleton);
module.exports = {
  bizSchema,
  updateSchema,
};
