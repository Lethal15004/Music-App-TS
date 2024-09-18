import { Request,Response } from "express";
import User from "../../model/user.model";
import FavoriteSong from "../../model/favorite-song.mode";
import md5 from 'md5';

import * as generateHelper from '../../helper/generateString.helper';

export const registerPage= async(req: Request, res: Response)=>{
    res.render('client/pages/user/register',{
        title: 'Đăng ký tài khoản'
    })
}

export const register= async(req: Request, res: Response)=>{
    if(!req.body.fullName || !req.body.email || !req.body.password){
        req.flash('error','Vui lòng nhập đầy đủ thông tin');
        return res.redirect('/user/register');
    }
    const { fullName, email, password }: { fullName: string; email: string; password: string } = req.body;
    const data={
        fullName: fullName,
        email: email,
        password: md5(password),
        token:generateHelper.generateRandomString(30)
    }
    const newUser = new User(data);
    await newUser.save();
    const newListFavoriteSong=new FavoriteSong({
        userId: newUser.id,
    })
    await newListFavoriteSong.save();
    req.flash('success','Đăng ký thành công');
    return res.redirect('/user/register');
}