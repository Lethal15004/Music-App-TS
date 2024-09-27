import {Express} from 'express';
// import routes
import dashboardRoute from './dashboard.route';
import topicRoute from './topic.route';
import songRoute from './song.route';
import uploadRoute from './upload.route';
const routeAdmin = (app:Express) =>{
    const PATH =app.locals.prefixAdmin;
    app.use(`/${PATH}/dashboard`,dashboardRoute);
    app.use(`/${PATH}/topics`,topicRoute);
    app.use(`/${PATH}/songs`,songRoute);
    app.use(`/${PATH}/upload`,uploadRoute);
}

export default routeAdmin;