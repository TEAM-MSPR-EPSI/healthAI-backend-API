const express = require("express");
const router = express.Router();
const SportProgramController = require("../controllers/sportProgram.controller");

router.post("/", SportProgramController.create);
router.get("/", SportProgramController.getAll);
router.get("/:id", SportProgramController.getById);
router.put("/:id", SportProgramController.update);
router.delete("/:id", SportProgramController.delete);

module.exports = router;
