import express from 'express';
const router= express.Router();

import * as songController from '../../controller/client/song.controller';
router.get('/:slugTopics',songController.list);
router.get('/detail/:slugSong',songController.detail);
router.patch('/like',songController.like);
router.patch('/favorite',songController.favorite);

export default router;