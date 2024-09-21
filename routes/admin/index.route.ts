import {Express} from 'express';
// import routes
import dashboardRoute from './dashboard.route';

const routeAdmin = (app:Express) =>{
    const PATH =app.locals.prefixAdmin;
    app.use(`/${PATH}/dashboard`,dashboardRoute);
}

export default routeAdmin;