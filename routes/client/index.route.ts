import {Express} from 'express';

import topicRoute from './topic.route';
import songRoute from './song.route';
import userRoute from './user.route';

import checkLogin from '../../middleware/checkLogin.middleware';
const routeClient = (app:Express) =>{
    app.use(checkLogin);
    app.use('/topics',topicRoute);
    app.use('/songs',songRoute);
    app.use('/user',userRoute);
}

export default routeClient;