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

app.get('/topics',(req: Request, res:Response)=>{
    res.render('client/pages/topics/index', {
        title:'Trang chủ đề bài hát'
    })
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});