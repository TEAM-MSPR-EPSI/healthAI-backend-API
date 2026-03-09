const express = require("express");
const router = express.Router();
const SportEquipmentController = require("../controllers/sportEquipment.controller");

router.post("/", SportEquipmentController.create);
router.get("/", SportEquipmentController.getAll);
router.get("/:id", SportEquipmentController.getById);
router.put("/:id", SportEquipmentController.update);
router.delete("/:id", SportEquipmentController.delete);

module.exports = router;
