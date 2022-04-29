const express = require('express');

const routerSales = express.Router();

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

const getAll = async (req, res) => {
  const salesAll = await returnSales();

  if (salesAll.length === 0) {
    return res.sendStatus(HTTP_NOT_FOUND_STATUS);
  }
  return res.status(HTTP_OK_STATUS).send(salesAll);
};

routerSales.get('/', getAll);

const getById = async (req, res) => {
  const { id } = req.params;
  const salesAll = await returnSalesId(id);

  if (salesAll.length === 0) {
    return res
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Sale not found' });
  }
  return res.status(HTTP_OK_STATUS).json(salesAll);
};

routerSales.get('/:id', getById);

const create = async (req, res) => {
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
};

routerSales.post('/', validSales, create);

const update = async (req, res) => {
  // console.log(req.body);
  const { body } = req;
  const { id } = req.params;

  const insert = await returnUpdateSales(body, id);

  return res.status(200).json(insert);
};

routerSales.put('/:id', validSales, update);

const deleteSales = async (req, res) => {
  // console.log(req.body);
  const { id } = req.params;

  const insert = await returnDeleteSales(id);
  if (insert === false) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.sendStatus(204);
};

routerSales.delete('/:id', deleteSales);

module.exports = { routerSales, getAll, getById, create, update, deleteSales };
