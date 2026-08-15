const db = require("../config/db");

// GET all messages
const getMessages = (req, res) => {
  const sql = "SELECT * FROM messages ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);

      return res.status(500).json({
        message: "Failed to fetch messages",
      });
    }

    res.json(results);
  });
};

// CREATE a new message
const createMessage = (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Name, email and message are required",
    });
  }

  const sql = `
    INSERT INTO messages
    (name, email, message)
    VALUES (?, ?, ?)
  `;

  const values = [
    name,
    email,
    message,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating message:", err);

      return res.status(500).json({
        message: "Failed to send message",
      });
    }

    res.status(201).json({
      message: "Message sent successfully",
      messageId: result.insertId,
    });
  });
};

// DELETE a message
const deleteMessage = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM messages WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting message:", err);

      return res.status(500).json({
        message: "Failed to delete message",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.json({
      message: "Message deleted successfully",
    });
  });
};

module.exports = {
  getMessages,
  createMessage,
  deleteMessage,
};