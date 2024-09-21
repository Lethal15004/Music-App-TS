import express from 'express';
const router= express.Router();

import * as dashBoardController from '../../controller/admin/dashboard.controller';

router.get('/',dashBoardController.index);


export default router;