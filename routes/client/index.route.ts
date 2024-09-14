import {Express} from 'express';

import topicRoute from './topic.route';
const routeClient = (app:Express) =>{
    app.use('/topics',topicRoute);
}

export default routeClient;