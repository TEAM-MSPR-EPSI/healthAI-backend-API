const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const {authenticate, authorize} = require("../middleware/auth");

const avatarsDir = path.join(__dirname, '..', 'uploads', 'avatars');
if (!fs.existsSync(avatarsDir)) {
	fs.mkdirSync(avatarsDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, avatarsDir),
	filename: (_req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
	},
});

const upload = multer({ storage });

router.post("/", UserController.create);
router.get("/me", authenticate, UserController.getMe);
router.put("/me", authenticate, UserController.updateMe);
router.put("/me/avatar", authenticate, upload.single('avatar'), UserController.updateAvatar);
router.get("/", authenticate, authorize("admin") ,UserController.getAll);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;