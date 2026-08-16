const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const messageRoutes = require("./routes/messageRoutes");
const heroRoutes = require("./routes/heroRoutes");

const app = express();

const PORT = 5001;

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());

// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio Backend API is running 🚀",
  });
});

// =====================================================
// API ROUTES
// =====================================================

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/hero", heroRoutes);

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});