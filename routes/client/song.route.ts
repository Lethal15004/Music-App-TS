import express from 'express';
const router= express.Router();

import * as songController from '../../controller/client/song.controller';
router.get('/:slugTopics',songController.list);

export default router;