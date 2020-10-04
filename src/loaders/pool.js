const mysql = require("mysql")

var pool_option = require('../config')
var pool = mysql.createPool(pool_option)

module.exports=pool