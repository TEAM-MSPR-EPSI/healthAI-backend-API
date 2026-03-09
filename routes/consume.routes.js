const express = require("express");
const router = express.Router();
const ConsumeController = require("../controllers/consume.controller");

router.post("/", ConsumeController.create);
router.get("/", ConsumeController.getAll);
router.get("/:id", ConsumeController.getById);
router.get("/user/:userId", ConsumeController.getByUserId);
router.put("/:id", ConsumeController.update);
router.delete("/:id", ConsumeController.delete);

module.exports = router;
