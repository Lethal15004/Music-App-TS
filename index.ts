import express,{Express, Request, Response,NextFunction} from 'express';
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
import bodyParser from'body-parser';//Nhúng body-parser từ module body-parser
dotenv.config();//Thêm config cho dotenv
import path from 'path';

import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app: Express = express();
const port : number | string =process.env.PORT ||3000;

import routeClient from './routes/client/index.route';
import routeAdmin from './routes/admin/index.route';
import { systemConfig } from './config/system';

import connectDatabase from './config/database';
connectDatabase();

//Phần tinymce -> Để sử dụng trình soạn thảo tinymce (Quan trọng phải có)
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//Phần view engine -> Để render file pug (Quan trọng phải có)
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));//Định tuyến file tĩnh (Quan trọng phải có)

//Nhúng body-parser vào dự án
app.use(bodyParser.urlencoded({ extended: false }))//Nhận dữ liệu từ form
app.use(bodyParser.json());//Nhận dữ liệu từ fetch

//Phần flash -> Để hiển thị thông báo (Quan trọng phải có)
app.use(cookieParser('alert-1x2'));
app.use(session(
    {   secret: 'some secret', // Thay thế bằng một khóa bí mật mạnh
        resave: false,
        cookie: { maxAge: 20*60*1000 },
        saveUninitialized:true
    }
));
app.use(flash());
//Middleware để truyền biến messages vào tất cả các view
app.use((req:Request, res:Response,next:NextFunction)=>{
    res.locals.messages = req.flash();
    next();
})
app.locals.prefixAdmin = systemConfig.prefixAdmin;//Truyền biến locals cho các router và file pug sử dụng
routeClient(app);
routeAdmin(app);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});