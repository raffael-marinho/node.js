const connection = require('./connection');

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
  const itemsSold = salesArray.map(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [id, sale.productId, sale.quantity],
    );
    return { productId: sale.productId, quantity: sale.quantity };
  });
  console.log(itemsSold);
  return { id, itemsSold: salesArray };
}

// salesId(1);
// sales();
module.exports = { sales, salesId, insertSales };
