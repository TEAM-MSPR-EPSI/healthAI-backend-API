const express = require("express");
const router = express.Router();
const UserAllergyController = require("../controllers/userAllergy.controller");

router.get("/:userId", UserAllergyController.getByUserId);
router.post("/:userId", UserAllergyController.set);
router.post("/:userId/add", UserAllergyController.add);
router.delete("/:userId/:allergy", UserAllergyController.remove);

module.exports = router;
