const express = require('express');

const router = express.Router();

const {
  returnSales,
  returnSalesId,
  returnInsertSales,
  returnUpdateSales,
  returnDeleteSales,
} = require('../services/salesServices');

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
  // console.log(req.body);
  const { body } = req;
  const insert = await returnInsertSales(body);
  console.log({ insert });
  if (insert === false) {
    return res
      .status(422)
      .json({ message: 'Such amount is not permitted to sell' });
  }
  return res.status(201).json(insert);
});

router.put('/:id', validSales, async (req, res) => {
  // console.log(req.body);
  const { body } = req;
  const { id } = req.params;

  const insert = await returnUpdateSales(body, id);

  return res.status(200).json(insert);
});
router.delete('/:id', async (req, res) => {
  // console.log(req.body);
  const { id } = req.params;

  const insert = await returnDeleteSales(id);
  if (insert === false) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.sendStatus(204);
});

module.exports = router;
