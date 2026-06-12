const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const SocialPostController = require('../controllers/socialPost.controller');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT || 'http://minio:9000',
  region: 'us-east-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.APP_ACCESS_KEY || 'app-access-key',
    secretAccessKey: process.env.APP_SECRET_KEY || 'app-secret-key',
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'photos',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `users/${req.user ? req.user.id : 'unknown'}/${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  }),
  limits: { fileSize: 30 * 1024 * 1024 },
});

router.get('/', authenticate, SocialPostController.list);
router.get('/me', authenticate, SocialPostController.listMine);
router.post('/', authenticate, upload.single('media'), SocialPostController.create);
router.put('/:id', authenticate, upload.single('media'), SocialPostController.update);
router.delete('/:id', authenticate, SocialPostController.remove);
router.post('/:id/like', authenticate, SocialPostController.toggleLike);
router.post('/:id/comments', authenticate, SocialPostController.addComment);

module.exports = router;
