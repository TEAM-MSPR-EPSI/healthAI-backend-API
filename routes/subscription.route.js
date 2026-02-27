const express = require("express")
const router = express.Router();
const SubscriptionController = require ("../controllers/subscription.controller");

router.post("/", SubscriptionController.create);
router.get("/", SubscriptionController.getAll);
router.get("/:id", SubscriptionController.getById);
router.post("/:id", SubscriptionController.update);
router.delete("/:id", SubscriptionController.delete);

module.exports = router