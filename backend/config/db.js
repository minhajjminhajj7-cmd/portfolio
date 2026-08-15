const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "portfolio_db",
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    return;
  }

  console.log("✅ MySQL database connected successfully!");

  connection.release();
});

module.exports = db;