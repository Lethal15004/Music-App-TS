import express from 'express';
const router= express.Router();

import * as userController from '../../controller/client/user.controller';
router.get('/register',userController.registerPage);
router.post('/register',userController.register);
router.get('/login',userController.loginPage);
router.post('/login',userController.login);
router.get('/logout',userController.logout);


export default router;