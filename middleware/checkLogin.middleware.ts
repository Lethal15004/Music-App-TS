import { Request,Response,NextFunction } from "express";
import User from '../model/user.model';
const checkLogin = async(req: Request, res: Response, next: NextFunction)=>{
    if(req.cookies.tokenUser){
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted:false,
            status:'active'
        })
        if(!user){
            req.flash('error','Tài khoản không tồn tại');
            res.redirect('/user/login');
            return;
        }
        res.locals.user = user;
    }
    next();
}
export default checkLogin;