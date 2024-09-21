import express from 'express';
const router= express.Router();

import * as topicController from '../../controller/admin/topic.controller';

router.get('/',topicController.index);


export default router;