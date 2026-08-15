const db = require("../config/db");

// GET all skills
const getSkills = (req, res) => {
  const sql = "SELECT * FROM skills ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching skills:", err);

      return res.status(500).json({
        message: "Failed to fetch skills",
      });
    }

    res.json(results);
  });
};

// CREATE a new skill
const createSkill = (req, res) => {
  const { name, category, proficiency } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Skill name is required",
    });
  }

  const sql = `
    INSERT INTO skills
    (name, category, proficiency)
    VALUES (?, ?, ?)
  `;

  const values = [
    name,
    category,
    proficiency,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating skill:", err);

      return res.status(500).json({
        message: "Failed to create skill",
      });
    }

    res.status(201).json({
      message: "Skill created successfully",
      skillId: result.insertId,
    });
  });
};

// UPDATE a skill
const updateSkill = (req, res) => {
  const { id } = req.params;
  const { name, category, proficiency } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Skill name is required",
    });
  }

  const sql = `
    UPDATE skills
    SET
      name = ?,
      category = ?,
      proficiency = ?
    WHERE id = ?
  `;

  const values = [
    name,
    category,
    proficiency,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating skill:", err);

      return res.status(500).json({
        message: "Failed to update skill",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.json({
      message: "Skill updated successfully",
    });
  });
};

// DELETE a skill
const deleteSkill = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM skills WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting skill:", err);

      return res.status(500).json({
        message: "Failed to delete skill",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.json({
      message: "Skill deleted successfully",
    });
  });
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};