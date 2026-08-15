const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

// GET all messages
router.get("/", messageController.getMessages);

// CREATE message
router.post("/", messageController.createMessage);

// DELETE message
router.delete("/:id", messageController.deleteMessage);

module.exports = router;