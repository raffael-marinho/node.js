const joi = require('joi');

const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

const routerSchema = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().required().integer().min(1),
});

async function validProducts(req, res, next) {
  const { name, quantity } = await req.body;

  const { error, value } = routerSchema.validate({ name, quantity });
  
  if (error && (value.name === undefined || value.quantity === undefined)) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: error.details[0].message });
  }
  if (error) {
    return res
      .status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
      .json({ message: error.details[0].message });
  }
  next();
}

module.exports = { validProducts };
