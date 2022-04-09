const blueBird = require('bluebird');
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: 'StoreManager',
  password: process.env.MYSQL_PASSWORD,
  port: process.env.port,
  Promise: blueBird,
});

module.exports = connection;
