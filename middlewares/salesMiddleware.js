const joi = require('joi');

// const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

const routerSchema = joi.array().items(
  joi.object().keys({
    quantity: joi.number().required().integer().min(1),
    productId: joi.number().required().integer().min(1),
  }),
);

async function validSales(req, res, next) {
  // const { productId, quantity } = await req.body;

  const { error, value } = await routerSchema.validate(req.body);
  console.log(value);
  const vlx = value.find((item) => item.quantity <= 0);
  if (vlx) {
    return res
      .status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
      .json({ message: `"${error.details[0].message.split('.')[1]}` });
  }
  if (error) {
    return res
      .status(400)
      .json({ message: `"${error.details[0].message.split('.')[1]}` });
  }
  next();
}

module.exports = { validSales };
