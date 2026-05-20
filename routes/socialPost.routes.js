const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const SocialPostController = require('../controllers/socialPost.controller');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads', 'social');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 },
});

router.get('/', SocialPostController.list);
router.post('/', authenticate, upload.single('media'), SocialPostController.create);

module.exports = router;
