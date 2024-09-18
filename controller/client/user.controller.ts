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
        return res.redirect('back');
    }
    const { fullName, email, password }: { fullName: string; email: string; password: string } = req.body;
    const userExist = await User.findOne({
        email:email,
        deleted:false,
        status:'active'
    })
    if(userExist){
        req.flash('error','Tài khoản đã tồn tại');
        return res.redirect('back');
    }
    const data={
        fullName: fullName,
        email: email,
        password: md5(password),
        tokenUser:generateHelper.generateRandomString(30)
    }
    const newUser = new User(data);
    await newUser.save();
    const newListFavoriteSong=new FavoriteSong({
        userId: newUser.id,
    })
    await newListFavoriteSong.save();
    req.flash('success','Đăng ký thành công');
    res.redirect('/user/login');
}

export const loginPage= async(req: Request, res: Response)=>{
    res.render('client/pages/user/login',{
        title: 'Đăng nhập'
    })
}

export const login= async(req: Request, res: Response)=>{
    if(!req.body.email || !req.body.password){
        req.flash('error','Vui lòng nhập đầy đủ thông tin');
        return res.redirect('/user/login');
    }
    const { email, password }: { email: string; password: string } = req.body;
    const user = await User.findOne({
        email:email,
        deleted:false,
    })
    if(!user){
        req.flash('error','Tài khoản không tồn tại');
        res.redirect('back');
        return;
    }
    if(md5(password)!==user.password){
        req.flash('error','Mật khẩu không chính xác');
        res.redirect('back');
        return;
    }
    if(user.status!=='active'){
        req.flash('error','Tài khoản đang bị khóa');
        res.redirect('back');
        return;
    }
    res.cookie('tokenUser', user.tokenUser);
    await User.updateOne({
        email:email,
        status:'active',
        deleted:false
    },{
        statusOnline:'online'
    })
    req.flash('success','Đăng nhập thành công');
    res.redirect('/topics');
}