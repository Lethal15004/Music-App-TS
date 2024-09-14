import {Express} from 'express';

import topicRoute from './topic.route';
import songRoute from './song.route';
const routeClient = (app:Express) =>{
    app.use('/topics',topicRoute);
    app.use('/songs',songRoute);
}

export default routeClient;