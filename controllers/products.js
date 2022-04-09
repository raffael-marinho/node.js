const express = require('express');

const router = express.Router();

const {
  returnproducts,
  returnproductsId,
} = require('../services/productsServices');

const { validProducts } = require('../middlewares/productsMiddleware');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
// const HTTP_BAD_REQUEST_STATUS = 400;
router.get('/', async (req, res) => {
  const productsAll = await returnproducts();
  // console.log(productsAll);
  if (productsAll.length === 0) {
    return res.sendStatus(HTTP_NOT_FOUND_STATUS);
  }
  return res.status(HTTP_OK_STATUS).json(productsAll);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const productsAll = await returnproductsId(id);

  if (productsAll.length === 0) {
    return res
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Product not found' });
  }
  return res.status(HTTP_OK_STATUS).json(productsAll[0]);
});

router.post('/', validProducts, async (req, res) => {
  console.log(req.body);
  return res.status(HTTP_OK_STATUS).json();
});

module.exports = router;
