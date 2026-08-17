const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ADMIN LOGIN
const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const sql = "SELECT * FROM admins WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    // Database error
    if (err) {
      console.error("LOGIN DATABASE ERROR:", err);

      return res.status(500).json({
        message: "Server error",
      });
    }

    // Admin not found
    if (results.length === 0) {
      console.log("ADMIN NOT FOUND:", email);

      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const admin = results[0];

    try {
      // Check password
      const passwordMatch = await bcrypt.compare(
        password,
        admin.password
      );

      console.log("PASSWORD MATCH:", passwordMatch);

      // Wrong password
      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Check JWT secret
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET IS MISSING!");

        return res.status(500).json({
          message: "Server configuration error",
        });
      }

      // Create JWT token
      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      console.log("JWT TOKEN CREATED SUCCESSFULLY");

      // Successful login
      return res.status(200).json({
        message: "Login successful",
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      });

    } catch (error) {
      // Authentication/JWT error
      console.error("AUTHENTICATION ERROR:", error);

      return res.status(500).json({
        message: "Authentication failed",
        error: error.message,
      });
    }
  });
};

module.exports = {
  loginAdmin,
};
