"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
var mysql = require("mysql2");
var util = require("util");
var pool = mysql.createPool({
    host: 'localhost',
    connectionLimit: 10,
    user: 'root',
    password: 'Gold420@',
    database: 'test_demo',
    multipleStatements: true
});
pool.getConnection(function (err, connection) {
    if (err) {
        console.error(err);
        return;
    }
    if (connection) {
        console.log('connected');
        connection.release();
    }
});
exports.query = util.promisify(pool.query).bind(pool);
exports.default = { pool: pool };
