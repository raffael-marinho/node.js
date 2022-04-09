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
// productsId(2);
// products();
module.exports = { products, productsId, insertProducts, getProductByName };
