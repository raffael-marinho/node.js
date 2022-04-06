const { sales, salesId } = require('../models/salesModel');

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

module.exports = { returnSales, returnSalesId };
