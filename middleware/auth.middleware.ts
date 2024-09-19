import { Request,Response,NextFunction } from "express";
import User from '../model/user.model';
export const notGetMethod = async(req: Request, res: Response, next: NextFunction)=>{
    if(!req.cookies.tokenUser){
        res.json({
            code: 401,
            message: 'Bạn cần đăng nhập để sử dụng tính năng này'
        })
        return;
    }
    const userExist = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted:false,
        status:'active'
    }).select('fullName email phone avatar');
    if(!userExist){
        res.json({
            code: 401,
            message: 'Tài khoản không tồn tài'
        })
        return;
    }
    next();
}
export const getMethod = async(req: Request, res: Response, next: NextFunction)=>{
    if(!req.cookies.tokenUser){
        req.flash('error', 'Cần đăng nhập để sử dụng tính năng này');
        res.redirect('/user/login');
        return;
    }
    const userExist = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted:false,
        status:'active'
    }).select('fullName email phone avatar');
    if(!userExist){
        req.flash('error', 'Tài khoản không hợp lệ');
        res.redirect('/user/login');
        return;
    }
    next();
}