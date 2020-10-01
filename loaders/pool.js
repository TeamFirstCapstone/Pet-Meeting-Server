mysql = require("mysql")

var pool_option = require('../config/pool_option')
var pool = mysql.createPool(pool_option)

module.exports=pool