import express from 'express';
import multer from 'multer';
const router= express.Router();

const upload = multer();// Tạo multer để upload ảnh

import * as songController from '../../controller/admin/song.controller';
import * as uploadCloud from '../../middleware/admin/uploadCloudinary.middleware';

router.get('/',songController.index);
router.get('/create',songController.createPage);
router.post(
    '/create',
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    songController.create);


export default router;