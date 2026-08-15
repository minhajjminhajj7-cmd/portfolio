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
    if (err) {
      console.error("Login error:", err);

      return res.status(500).json({
        message: "Server error",
      });
    }

    // Admin not found
    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const admin = results[0];

    try {
      // Compare entered password with hashed password
      const passwordMatch = await bcrypt.compare(
        password,
        admin.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
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

      res.json({
        message: "Login successful",
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      });

    } catch (error) {
      console.error("Authentication error:", error);

      return res.status(500).json({
        message: "Authentication failed",
      });
    }
  });
};

module.exports = {
  loginAdmin,
};