const express = require("express");

const router = express.Router();

const heroController = require("../controllers/heroController");

router.get("/", heroController.getHero);
router.post("/", heroController.createHero);
router.put("/:id", heroController.updateHero);
router.delete("/:id", heroController.deleteHero);

module.exports = router;