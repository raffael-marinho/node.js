const connection = require('./connection');

async function salesProducts() {
  const result = await connection.execute('SELECT * FROM sales_products');
  return result[0];
}

module.exports = salesProducts;