import { Request,Response } from "express";
import Song from "../../model/song.model";
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