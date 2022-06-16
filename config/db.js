const { Client } = require("pg");

// const db = mysql.createConnection({
//     host: "sql6.freesqldatabase.com",
//     user: "sql6443580",
//     password: "c2PxTrlpaW",
//     database: "sql6443580",
//     port: 3306,
// })

const db = new Client({
  host: "localhost",
  user: "postgres",
  password: "admin123",
  database: "testsql_1",
  port: 5432,
});

db.connect();

module.exports = db;
