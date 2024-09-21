import {Express} from 'express';
// import routes
import dashboardRoute from './dashboard.route';
import topicRoute from './topic.route';
const routeAdmin = (app:Express) =>{
    const PATH =app.locals.prefixAdmin;
    app.use(`/${PATH}/dashboard`,dashboardRoute);
    app.use(`/${PATH}/topics`,topicRoute);
}

export default routeAdmin;