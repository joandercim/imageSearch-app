const Joi = require('joi');

exports.userSchema = Joi.object({
  userId: Joi.string().required(),
  userDetails: Joi.object({
    favoriteImages: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        link: Joi.string().required(),
      })
    ),
  }),
});
