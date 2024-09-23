import { Request,Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topics.model";
import Singer from "../../model/singer.model";
// [GET] /admin/dashboard
export const index = async (req:Request,res:Response)=>{
    const songs = await Song.find({
        status:'active',
        deleted:false
    })
    res.render('admin/pages/song/index',{
        title:'Quản lý bài hát',
        songs:songs
    });
}

export const createPage = async (req:Request,res:Response)=>{
    const topics= await Topic.find({
        deleted:false,
        status:'active'
    }).select('title');
    
    const singers = await Singer.find({
        deleted:false,
        status:'active'
    }).select('fullName');

    res.render('admin/pages/song/create',{
        title:'Thêm mới bài hát',
        topics:topics,
        singers:singers
    })
}

export const create = async (req:Request,res:Response)=>{
    const newSong =new Song(req.body);
    await newSong.save();
    req.flash('success','Thêm mới bài hát thành công');
    res.redirect('/admin/songs');
}