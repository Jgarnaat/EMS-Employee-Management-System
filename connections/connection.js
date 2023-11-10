const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'M6S1L0ass294d',
    database: 'employee_tracker_db'
});

module.exports = db;
