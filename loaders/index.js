const {expressLoader} = require("./express");
const {mysqlLoader} = require("./mysql");

module.exports = {
  loaders: ({ expressApp }) => {
    // const mysqlConnection = await mysqlLoader();
    console.log("MySQL Intialized");

    expressLoader({ app: expressApp });
    console.log("Express Intialized");

    // return { mysqlConnection };
    return { expressApp };
  }
}