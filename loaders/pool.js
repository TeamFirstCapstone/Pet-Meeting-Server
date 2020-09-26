var pool_src = require('../config/index')
var mysql = require('mysql');
var pool = mysql.createPool(pool_src);

module.exports = pool