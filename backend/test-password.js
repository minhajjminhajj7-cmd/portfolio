require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("./config/db");

db.query(
  "SELECT password FROM admins WHERE email = ?",
  ["minhajj@gmail.com"],
  async (err, results) => {
    if (err) {
      console.error("DATABASE ERROR:", err);
      process.exit();
    }

    if (results.length === 0) {
      console.log("ADMIN NOT FOUND");
      process.exit();
    }

    const match = await bcrypt.compare(
      "123",
      results[0].password
    );

    console.log("PASSWORD MATCH:", match);

    process.exit();
  }
);
