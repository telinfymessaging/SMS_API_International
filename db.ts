import * as mysql from 'mysql2';
import * as util from "util";

const pool = mysql.createPool({
  host: 'localhost',
  connectionLimit: 10,
  user: 'root',
  password: 'Gold420@',
  database: 'test_demo',
  multipleStatements: true
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error(err);
    return;
  }
  if (connection) {
    console.log('connected');
    connection.release();
  }
});


export const query = util.promisify(pool.query).bind(pool);


export default {pool};
