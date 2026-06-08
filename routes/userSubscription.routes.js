const express = require("express");
const router = express.Router();
const UserSubscriptionController = require("../controllers/userSubscription.controller");
const { authenticate } = require("../middleware/auth");

router.post("/", UserSubscriptionController.subscribe);
router.get("/", UserSubscriptionController.getAll);
router.get("/me/active", authenticate, UserSubscriptionController.getActiveForCurrentUser);
router.get("/:id", UserSubscriptionController.getById);
router.get("/user/:userId", UserSubscriptionController.getByUserId);
router.patch("/:id/cancel", UserSubscriptionController.cancel);
router.put("/:id", UserSubscriptionController.update);
router.delete("/:id", UserSubscriptionController.delete);

module.exports = router;
