const {
  sales,
  salesId,
  insertSales,
  updateSales,
  deleteSales,
} = require('../models/salesModel');

async function returnSales() {
  const salesAll = await sales();
  return salesAll.map((sale) => ({
    saleId: sale.sale_id,
    productId: sale.product_id,
    date: sale.date,
    quantity: sale.quantity,
  }));
}

async function returnSalesId(id) {
  const salesIdAll = await salesId(id);
  // console.log(salesIdAll);
  return salesIdAll.map((sale) => ({
    productId: sale.product_id,
    date: sale.date,
    quantity: sale.quantity,
  }));
}

async function returnInsertSales(salesARR) {
  const result = await insertSales(salesARR);
  return result;
}
async function returnUpdateSales(salesARR, id) {
  const result = await updateSales(salesARR, id);
  return result;
}
async function returnDeleteSales(salesARR, id) {
  const result = await deleteSales(salesARR, id);
  return result;
}

module.exports = {
  returnSales,
  returnSalesId,
  returnInsertSales,
  returnUpdateSales,
  returnDeleteSales,
};
