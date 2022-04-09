const {
  products,
  productsId,
  insertProducts,
  getProductByName,
} = require('../models/productsModel');

async function returnproducts() {
  const productsAll = await products();
  return productsAll;
}

async function returnproductsId(id) {
  const productsIdAll = await productsId(id);
  return productsIdAll;
}

async function returnProductsIsert(name, quantity) {
  const check = await getProductByName(name);
  if (check.length > 0) {
    return false;
  }
  // console.log(check);
  const productsIdAll = await insertProducts(name, quantity);
  return { id: productsIdAll[0].insertId, name, quantity };
}

module.exports = { returnproducts, returnproductsId, returnProductsIsert };
