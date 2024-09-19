import express from 'express';
const router= express.Router();

import * as songController from '../../controller/client/song.controller';
import * as requireAuth from '../../middleware/auth.middleware';

router.get('/topic/:slugTopics',songController.list);
router.get('/detail/:slugSong',songController.detail);

router.get('/favorite',requireAuth.getMethod,songController.listFavorite);

router.patch('/like',requireAuth.notGetMethod,songController.like);
router.patch('/favorite',requireAuth.notGetMethod,songController.favorite);

export default router;