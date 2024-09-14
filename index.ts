import express,{Express, Request, Response} from 'express';
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
dotenv.config();//Thêm config cho dotenv

const app: Express = express();
const port : number | string =process.env.PORT ||3000;

import connectDatabase from './config/database';
connectDatabase();

//Phần view engine -> Để render file pug (Quan trọng phải có)
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));//Định tuyến file tĩnh (Quan trọng phải có)

import routeClient from './routes/client/index.route';
routeClient(app);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});