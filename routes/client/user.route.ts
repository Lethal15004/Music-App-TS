import express from 'express';
const router= express.Router();

import * as userController from '../../controller/client/user.controller';
router.get('/register',userController.registerPage);
router.post('/register',userController.register);


export default router;