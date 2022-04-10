const connection = require('./connection');

const map = (arr, id) =>
  arr.map(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [id, sale.productId, sale.quantity],
    );
    return { productId: sale.productId, quantity: sale.quantity };
  });

async function sales() {
  const result = await connection.execute(
    'SELECT * FROM sales_products JOIN sales ON sales.id = sales_products.sale_id',
  );

  // console.log(result[0]);
  return result[0];
}

async function salesId(parameter) {
  const result = await connection.execute(
    `SELECT * FROM sales_products 
    JOIN sales ON sales.id = sales_products.sale_id 
    WHERE sale_id = ${parameter}`,
  );
  // console.log(result[0]);
  return result[0];
}

async function insertSales(salesArray) {
  const result = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  const id = result[0].insertId;
  const itemsSold = map(salesArray, id);
  console.log(itemsSold);
  return { id, itemsSold: salesArray };
}

async function complement(id) {
  const result = await connection.execute('SELECT * FROM sales WHERE id = ?', [
    id,
  ]);
  if (result[0].length === 0) {
    return false;
  }
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [
    id,
  ]);
}
async function updateSales(salesArray, id) {
  const result = await complement(id);
  if (result === false) {
    return false;
  }
  const itemsSold = map(salesArray, id);
  console.log(itemsSold);
  return { saleId: id, itemUpdated: salesArray };
}

// salesId(1);
// sales();
module.exports = { sales, salesId, insertSales, updateSales };
