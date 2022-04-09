const connection = require('./connection');

async function products() {
  const result = await connection.execute('SELECT * FROM products');
  // console.log(result[0]);
  return result[0];
}

// products();

async function productsId(parameter) {
  const result = await connection.execute(
    `SELECT * FROM products WHERE id = ${parameter}`,
  );
  // console.log(result[0]);
  return result[0];
}

async function insertProducts(name, quantity) {
  const result = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  // console.log(result);
  return result;
}

async function getProductByName(name) {
  const result = await connection.execute(
    `SELECT * FROM products WHERE name = '${name}'`,
  );
  return result[0];
}

async function updateProducts(id, name, quantity) {
  const resultIdExist = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  // console.log(resultIdExist);
  if (resultIdExist[0].length === 0) {
    return false;
  }
  const result = await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
  return result[0];
}
// productsId(2);
// products();
module.exports = {
  products,
  productsId,
  insertProducts,
  getProductByName,
  updateProducts,
};
