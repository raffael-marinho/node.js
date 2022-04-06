const { sales, salesId } = require('../models/salesModel');

async function returnSales() {
  const salesAll = await sales();
  return salesAll;
}

async function returnSalesId(id) {
  const salesIdAll = await salesId(id);
  // console.log(salesIdAll);
  return salesIdAll;
}

module.exports = { returnSales, returnSalesId };
