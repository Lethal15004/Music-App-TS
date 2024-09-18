import { Request,Response,NextFunction } from "express";
import User from '../model/user.model';
const requireAuth = async(req: Request, res: Response, next: NextFunction)=>{
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
export default requireAuth;