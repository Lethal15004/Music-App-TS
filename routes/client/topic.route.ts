import express from 'express';
const router= express.Router();

import * as topicController from '../../controller/client/topics.controller';
router.get('/',topicController.index);

export default router;

