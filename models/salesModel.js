const connection = require('./connection');

const mapDell = async (arr) => {
  arr.map(async (sale) => {
    await connection.execute(
      'UPDATE products SET quantity = quantity + ? WHERE id = ?',
      [sale.quantity, sale.product_id],
    );
  });
};
const map = async (arr, id) =>
  arr.map(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [id, sale.productId, sale.quantity],
    );
    await connection.execute(
      'UPDATE products SET quantity = quantity - ? WHERE id = ?',
      [sale.quantity, sale.productId],
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

async function complement(id, salesArray) {
  const result = await connection.execute('SELECT * FROM sales WHERE id = ?', [
    id,
  ]);
  if (result[0].length === 0) {
    return false;
  }
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [
    id,
  ]);
  await salesArray.map(async (sale) => {
      await connection.execute(
        'UPDATE products SET quantity = quantity + ? WHERE id = ?',
        [sale.quantity, sale.productId],
      );
    });
}
async function updateSales(salesArray, id) {
  const result = await complement(id, salesArray);
  if (result === false) {
    return false;
  }
  const itemsSold = await map(salesArray, id);
  console.log(itemsSold);
  return { saleId: id, itemUpdated: salesArray };
}

async function deleteSales(id) {
  // console.log(id);
  const resultIdExist = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [id],
  );
  // console.log(resultIdExist);
  if (resultIdExist[0].length === 0) {
    return false;
  }
  const resultComplet = await connection.execute(
    'SELECT * FROM sales_products WHERE sale_id = ?',
    [id],
  );
  await mapDell(resultComplet[0]);
  console.log(resultComplet);
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [
    id,
  ]);

  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return true;
}
// salesId(1);
// sales();
module.exports = { sales, salesId, insertSales, updateSales, deleteSales };
