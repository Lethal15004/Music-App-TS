import express from 'express';
const router= express.Router();

import * as songController from '../../controller/client/song.controller';
import requireAuth from '../../middleware/auth.middleware';

router.get('/:slugTopics',songController.list);
router.get('/detail/:slugSong',songController.detail);
router.patch('/like',requireAuth,songController.like);
router.patch('/favorite',requireAuth,songController.favorite);

export default router;