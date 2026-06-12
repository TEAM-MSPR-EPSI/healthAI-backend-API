const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const {authenticate, authorize} = require("../middleware/auth");

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
    bucket: 'avatars',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${req.user ? req.user.id : 'unknown'}/${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  })
});

router.post("/", UserController.create);
router.get("/me", authenticate, UserController.getMe);
router.put("/me", authenticate, UserController.updateMe);
router.put("/me/avatar", authenticate, upload.single('avatar'), UserController.updateAvatar);
router.get("/", authenticate, authorize("admin") ,UserController.getAll);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;