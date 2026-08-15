const express = require("express");
const router = express.Router();

const skillController = require("../controllers/skillController");

// GET all skills
router.get("/", skillController.getSkills);

// CREATE skill
router.post("/", skillController.createSkill);

// UPDATE skill
router.put("/:id", skillController.updateSkill);

// DELETE skill
router.delete("/:id", skillController.deleteSkill);

module.exports = router;