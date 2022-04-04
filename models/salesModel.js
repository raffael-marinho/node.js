const connection = require('./connection');

async function sales() {
  const result = await connection.execute('SELECT * FROM sales');
  // console.log(result[0]);
  return result[0];
}

module.exports = sales;