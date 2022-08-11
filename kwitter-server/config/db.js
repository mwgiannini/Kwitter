var mysql = require('mysql');

var db = mysql.createConnection({
    host: '192.168.0.19',
    user: 'root',
    password: '123456',
    database: 'kwitterdb'
});

module.exports = db;