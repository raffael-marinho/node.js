const connection = require('./connection');

async function products() {
  const result = await connection.execute('SELECT * FROM products');
  // console.log(result[0]);
  return result[0];
}

async function productsId(parameter) {
  const result = await connection.execute(
    `SELECT * FROM products WHERE id = ${parameter}`,
  );
  // console.log(result[0]);
  return result[0];
}
// productsId(2);
// products();
module.exports = { products, productsId };
