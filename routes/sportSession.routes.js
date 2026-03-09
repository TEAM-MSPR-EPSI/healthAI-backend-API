const express = require("express");
const router = express.Router();
const SportSessionController = require("../controllers/sportSession.controller");

router.post("/", SportSessionController.create);
router.get("/", SportSessionController.getAll);
router.get("/:id", SportSessionController.getById);
router.put("/:id", SportSessionController.update);
router.delete("/:id", SportSessionController.delete);

module.exports = router;
