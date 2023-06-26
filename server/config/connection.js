// npm i mysql2
const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection(
  {
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    port : "3306"
  },
  console.log("Connected to mariaDB database")
);

module.exports = db;

