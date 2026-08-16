const db = require("../config/db");

// ================================
// GET HERO
// ================================
const getHero = (req, res) => {
  const sql = "SELECT * FROM hero ORDER BY id ASC LIMIT 1";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching hero:", err);

      return res.status(500).json({
        message: "Failed to fetch hero",
      });
    }

    if (results.length === 0) {
      return res.json(null);
    }

    res.json(results[0]);
  });
};

// ================================
// CREATE HERO
// ================================
const createHero = (req, res) => {
  const {
    greeting,
    name,
    title,
    description,
    projects_button_text,
    contact_button_text,
  } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  const sql = `
    INSERT INTO hero
    (
      greeting,
      name,
      title,
      description,
      projects_button_text,
      contact_button_text
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    greeting,
    name,
    title,
    description,
    projects_button_text,
    contact_button_text,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating hero:", err);

      return res.status(500).json({
        message: "Failed to create hero",
      });
    }

    res.status(201).json({
      message: "Hero created successfully",
      heroId: result.insertId,
    });
  });
};

// ================================
// ================================
// UPDATE HERO
// ================================
const updateHero = (req, res) => {
  const { id } = req.params;

  const {
    greeting,
    name,
    title,
    description,
    projects_button_text,
    contact_button_text,
  } = req.body;

  console.log("UPDATE HERO REQUEST:");
  console.log("ID:", id);
  console.log("BODY:", req.body);

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  const sql = `
    UPDATE hero
    SET
      greeting = ?,
      name = ?,
      title = ?,
      description = ?,
      projects_button_text = ?,
      contact_button_text = ?
    WHERE id = ?
  `;

  const values = [
    greeting,
    name,
    title,
    description,
    projects_button_text,
    contact_button_text,
    id,
  ];

  console.log("SQL VALUES:", values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("=================================");
      console.error("MYSQL UPDATE ERROR:");
      console.error(err);
      console.error("=================================");

      return res.status(500).json({
        message: "Failed to update hero",
        error: err.message,
        code: err.code,
        sqlMessage: err.sqlMessage,
      });
    }

    console.log("UPDATE RESULT:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    res.json({
      message: "Hero updated successfully",
    });
  });
};

// DELETE HERO
// ================================
const deleteHero = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM hero WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting hero:", err);

      return res.status(500).json({
        message: "Failed to delete hero",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    res.json({
      message: "Hero deleted successfully",
    });
  });
};

module.exports = {
  getHero,
  createHero,
  updateHero,
  deleteHero,
};
