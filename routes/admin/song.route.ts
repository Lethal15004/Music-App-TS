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
    upload.fields([{name:'avatar',maxCount:1},{name:'audio',maxCount:1}]),
    uploadCloud.uploadFields,
    songController.create);
router.get('/edit/:id',songController.editPage);
router.patch(
    '/edit/:id',
    upload.fields([{name:'avatar',maxCount:1},{name:'audio',maxCount:1}]),
    uploadCloud.uploadFields,
    songController.edit);


export default router;