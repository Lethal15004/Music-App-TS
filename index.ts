import express,{Express, Request, Response} from 'express';
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
import bodyParser from'body-parser';//Nhúng body-parser từ module body-parser
dotenv.config();//Thêm config cho dotenv

const app: Express = express();
const port : number | string =process.env.PORT ||3000;

import connectDatabase from './config/database';
connectDatabase();

//Phần view engine -> Để render file pug (Quan trọng phải có)
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));//Định tuyến file tĩnh (Quan trọng phải có)

//Nhúng body-parser vào dự án
app.use(bodyParser.urlencoded({ extended: false }))//Nhận dữ liệu từ form
app.use(bodyParser.json());//Nhận dữ liệu từ fetch


import routeClient from './routes/client/index.route';
routeClient(app);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});