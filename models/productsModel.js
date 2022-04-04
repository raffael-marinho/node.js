const connection = require('./connection');

async function products() {
  const result = await connection.execute('SELECT * FROM products');
  // console.log(result[0]);
  return result[0];
}

// products();
module.exports = products;