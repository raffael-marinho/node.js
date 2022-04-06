const connection = require('./connection');

async function sales() {
  const result = await connection.execute('SELECT * FROM sales');
  // console.log(result[0]);
  return result[0];
}

async function salesId(parameter) {
  const result = await connection.execute(
    `SELECT * FROM sales WHERE id = ${parameter}`,
  );
  // console.log(result[0]);
  return result[0];
}

// salesId(1);
// sales();
module.exports = { sales, salesId };
