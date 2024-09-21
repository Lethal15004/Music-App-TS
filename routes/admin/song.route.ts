import express from 'express';
const router= express.Router();

import * as songController from '../../controller/admin/song.controller';

router.get('/',songController.index);
router.get('/create',songController.createPage);


export default router;