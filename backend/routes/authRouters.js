const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// ADMIN LOGIN
router.post("/login", authController.loginAdmin);

module.exports = router;