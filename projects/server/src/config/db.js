const mysql = require("mysql");
const util = require("util");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "xmart",
  port: "3306",
});

const dbQuery = util.promisify(db.query).bind(db);

module.exports = { db, dbQuery };
