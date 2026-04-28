const express = require("express");
const router = express.Router();
const SessionProgressController = require("../controllers/sessionProgress.controller");

router.post("/", SessionProgressController.create);
router.get("/", SessionProgressController.getAll);
router.get("/:id", SessionProgressController.getById);
router.get("/user/:userId", SessionProgressController.getByUserId);
router.put("/:id", SessionProgressController.update);
router.delete("/:id", SessionProgressController.delete);

module.exports = router;
