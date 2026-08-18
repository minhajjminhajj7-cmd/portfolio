const db = require("../config/db");

// ================================
// GET ABOUT
// ================================
const getAbout = (req, res) => {
  const sql = "SELECT * FROM about ORDER BY id ASC LIMIT 1";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching about:", err);

      return res.status(500).json({
        message: "Failed to fetch about",
      });
    }

    if (results.length === 0) {
      return res.json(null);
    }

    res.json(results[0]);
  });
};

// ================================
// CREATE ABOUT
// ================================
const createAbout = (req, res) => {
  const {
    heading,
    paragraph1,
    paragraph2,
  } = req.body;

  if (!heading) {
    return res.status(400).json({
      message: "Heading is required",
    });
  }

  const sql = `
    INSERT INTO about
    (
      heading,
      paragraph1,
      paragraph2
    )
    VALUES (?, ?, ?)
  `;

  const values = [
    heading,
    paragraph1,
    paragraph2,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating about:", err);

      return res.status(500).json({
        message: "Failed to create about",
      });
    }

    res.status(201).json({
      message: "About created successfully",
      aboutId: result.insertId,
    });
  });
};

// ================================
// UPDATE ABOUT
// ================================
const updateAbout = (req, res) => {
  const { id } = req.params;

  const {
    heading,
    paragraph1,
    paragraph2,
  } = req.body;

  if (!heading) {
    return res.status(400).json({
      message: "Heading is required",
    });
  }

  const sql = `
    UPDATE about
    SET
      heading = ?,
      paragraph1 = ?,
      paragraph2 = ?
    WHERE id = ?
  `;

  const values = [
    heading,
    paragraph1,
    paragraph2,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating about:", err);

      return res.status(500).json({
        message: "Failed to update about",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "About not found",
      });
    }

    res.json({
      message: "About updated successfully",
    });
  });
};

// ================================
// DELETE ABOUT
// ================================
const deleteAbout = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM about WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting about:", err);

      return res.status(500).json({
        message: "Failed to delete about",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "About not found",
      });
    }

    res.json({
      message: "About deleted successfully",
    });
  });
};

module.exports = {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
};
