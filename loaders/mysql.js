const mysql = require("mysql");
const { databaseOption } = require("../config/index");

export default async () => {
  const connection = await mysql.createConnection(databaseOption);
  connection.connect();
  return connection;
};
