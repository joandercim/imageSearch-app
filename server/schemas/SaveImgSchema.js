const Joi = require('joi');

exports.saveImgSchema = Joi.object({
  userId: Joi.string().required(),
  image: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    link: Joi.string().required(),
  }).required(),
});
