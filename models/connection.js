const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'StoreManager',
  password: '1234',
  port: 3306,
});

module.exports = connection;
