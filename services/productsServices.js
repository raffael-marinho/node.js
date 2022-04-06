const { products, productsId } = require('../models/productsModel');

async function returnproducts() {
  const productsAll = await products();
  return productsAll;
}

async function returnproductsId(id) {
  const productsIdAll = await productsId(id);
  return productsIdAll;
}

module.exports = { returnproducts, returnproductsId };
