const express = require("express");
const router = express.Router();
const UserHealthProfileController = require("../controllers/userHealthProfile.controller");

router.post("/", UserHealthProfileController.create);
router.get("/", UserHealthProfileController.getAll);
router.get("/:id", UserHealthProfileController.getById);
router.get("/user/:userId", UserHealthProfileController.getByUserId);
router.put("/:id", UserHealthProfileController.update);
router.delete("/:id", UserHealthProfileController.delete);

module.exports = router;
