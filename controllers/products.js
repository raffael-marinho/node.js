const express = require('express');

const routerProducts = express.Router();

const {
  returnproducts,
  returnproductsId,
  returnProductsIsert,
  returnUpdateProducts,
  returnDeleteProducts,
} = require('../services/productsServices');

const { validProducts } = require('../middlewares/productsMiddleware');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
// const HTTP_BAD_REQUEST_STATUS = 400;
const getAll = async (req, res) => {
  const productsAll = await returnproducts();
  // console.log(productsAll);
  if (productsAll.length === 0) {
    return res.sendStatus(HTTP_NOT_FOUND_STATUS);
  }
  return res.status(HTTP_OK_STATUS).json(productsAll);
};

routerProducts.get('/', getAll);

const getById = async (req, res) => {
  const { id } = req.params;
  const productsAll = await returnproductsId(id);

  if (productsAll.length === 0) {
    return res
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Product not found' });
  }
  return res.status(HTTP_OK_STATUS).json(productsAll[0]);
};

routerProducts.get('/:id', getById);

const insertProduct = async (req, res) => {
  // console.log(req.body);
  const { name, quantity } = req.body;

  const validInsertProduct = await returnProductsIsert(name, quantity);
  // console.log(validInsertProduct);
  if (validInsertProduct === false) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  return res.status(201).json(validInsertProduct);
};

routerProducts.post('/', validProducts, insertProduct);

const updateProduct = async (req, res) => {
  // console.log(req.body);
  const { id } = req.params;
  const { name, quantity } = req.body;

  const adjustUpdate = await returnUpdateProducts(id, name, quantity);
  if (adjustUpdate === false) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(adjustUpdate);
};

routerProducts.put('/:id', validProducts, updateProduct);

const deleteProduct = async (req, res) => {
  // console.log(req.body);
  const { id } = req.params;

  const adjustUpdate = await returnDeleteProducts(id);
  if (adjustUpdate === false) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.sendStatus(204);
};

routerProducts.delete('/:id', deleteProduct);

module.exports = { routerProducts, getAll, getById, insertProduct, updateProduct, deleteProduct };
