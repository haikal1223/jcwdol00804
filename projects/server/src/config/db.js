const mysql = require("mysql2");
const util = require("util");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "xmart",
  port: "3306",
});

const dbQuery = util.promisify(db.query).bind(db);

module.exports = { db, dbQuery };
