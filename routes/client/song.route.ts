import express from 'express';
const router= express.Router();

import * as songController from '../../controller/client/song.controller';
router.get('/:slugTopics',songController.list);
router.get('/detail/:slugSong',songController.detail)

export default router;