import express from 'express';
import multer from 'multer';
const router= express.Router();

const upload = multer();// Tạo multer để upload ảnh

import * as uploadController from '../../controller/admin/upload.controller';
import * as uploadCloud from '../../middleware/admin/uploadCloudinary.middleware';

router.post('/',
    upload.single("file"),//name của phần nhập ảnh của tinymce là name
    uploadCloud.uploadSingle,
    uploadController.index);


export default router;