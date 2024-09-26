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
    if(req.body.avatar){
        req.body.avatar=req.body.avatar[0];
    }
    if(req.body.audio){
        req.body.audio=req.body.audio[0];
    }

    const newSong =new Song(req.body);
    await newSong.save();
    req.flash('success','Thêm mới bài hát thành công');
    res.redirect('/admin/songs');
}

export const editPage = async (req:Request,res:Response)=>{
    try {
        const id :string = req.params.id;
        const song = await Song.findOne({
            _id:id,
            deleted:false
        })
        const topics = await Topic.find({
            deleted:false,
            status:'active'
        }).select('title');
        
        const singers = await Singer.find({
            deleted:false,
            status:'active'
        }).select('fullName');

        res.render('admin/pages/song/edit',{
            title:"Chỉnh sửa bài hát",
            song:song,
            topics:topics,
            singers:singers
        })
    } catch (error) {
        req.flash('error', "Lỗi server");
        res.redirect('/admin/songs');
    }
}

export const edit = async (req:Request,res:Response)=>{
    try{
        const data=req.body;
        const id=req.params.id;
        await Song.updateOne({
            _id:id,
            deleted:false
        },data);
        req.flash('success','Cập nhật bài hát thành công');
        res.redirect('back');
    }catch{
        req.flash('error', "Lỗi server");
        res.redirect('back');
    }
}