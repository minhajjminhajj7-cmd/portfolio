const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = 5001;

// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());

// ================================
// Test Route
// ================================

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio Backend API is running 🚀"
  });
});

// ================================
// API Routes
// ================================

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);

// ================================
// Start Server
// ================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});