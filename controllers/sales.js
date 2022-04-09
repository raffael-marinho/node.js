const express = require('express');

const router = express.Router();

const { returnSales, returnSalesId } = require('../services/salesServices');
const { validSales } = require('../middlewares/salesMiddleware');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

router.get('/', async (req, res) => {
  const salesAll = await returnSales();

  if (salesAll.length === 0) {
    return res.sendStatus(HTTP_NOT_FOUND_STATUS);
  }
  return res.status(HTTP_OK_STATUS).send(salesAll);
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const salesAll = await returnSalesId(id);

  if (salesAll.length === 0) {
    return res
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Sale not found' });
  }
  return res.status(HTTP_OK_STATUS).json(salesAll);
});

router.post('/', validSales, async (req, res) => {
  console.log(req.body);
  return res.status(HTTP_OK_STATUS).json();
});
module.exports = router;
