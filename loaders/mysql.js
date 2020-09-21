const mysql = require("mysql");
const { databaseOption } = require("../config/index");

module.exports = {mysqlLoader: () => {
  // const connection = mysql.createConnection(databaseOption);
  const connection = mysql.createPool(databaseOption);


  connection.connect();
  return connection;
}}

// var mysql_pool = mysql.createPool(databaseOption);

// module.exports = mysql_pool;