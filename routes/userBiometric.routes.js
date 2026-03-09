const express = require("express");
const router = express.Router();
const UserBiometricController = require("../controllers/userBiometric.controller");

router.post("/", UserBiometricController.create);
router.get("/", UserBiometricController.getAll);
router.get("/:id", UserBiometricController.getById);
router.get("/user/:userId", UserBiometricController.getByUserId);
router.put("/:id", UserBiometricController.update);
router.delete("/:id", UserBiometricController.delete);

module.exports = router;
