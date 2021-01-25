const Joi = require('joi');

const ProductValidator = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().default(0.0),
  brand: Joi.string(),
  color: Joi.string(),
});

const ProductArrayValidator = Joi.array().items(ProductValidator);
module.exports = { ProductValidator, ProductArrayValidator };
