const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const {authenticate, authorize} = require("../middleware/auth");

router.post("/", UserController.create);
router.get("/", authenticate, authorize("admin") ,UserController.getAll);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;