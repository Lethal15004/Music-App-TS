import { Request,Response } from "express";
import Topic from "../../model/topics.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import FavoriteSong from "../../model/favorite-song.mode";

export const list = async(req: Request, res: Response) =>{
    const slugTopic : string = req.params.slugTopics;
    const topic = await Topic.findOne({slug: slugTopic,deleted: false,status:'active'}).select('id title');
    const songs=await Song.find({
        topicId:topic.id,
        deleted:false,
        status:'active'
    }).select("title avatar singerId like slug");
    for(const song of songs){
        const singer= await Singer.findOne({
            _id:song.singerId,
        }).select('fullName');
        song['singerFullName']=singer.fullName;
    }
    res.render('client/pages/songs/list',{
        title:topic.title,
        songs:songs
    })
}

export const detail = async(req: Request, res: Response) =>{
    const slugSong : string = req.params.slugSong;
    const song = await Song.findOne({
        slug: slugSong,
        deleted: false,
        status:'active'
    });
    let existFavoriteSong;
    try {
        existFavoriteSong = await FavoriteSong.findOne({
            //userId:res.locals.user.id,
            songId:song.id
        });
    } catch (error) {
        res.json({
            code:500,
            message:'Lỗi server'
        })
    }
    if(existFavoriteSong){
        song['isFavorite'] = true
    }

    let singer;
    let topic;
    try {
        singer= await Singer.findOne({
            _id:song.singerId
        }).select('fullName');
    
        topic=await Topic.findOne({
            _id:song.topicId
        }).select('title');
    } catch (error) {
        res.redirect('/topics');
    }

    res.render('client/pages/songs/detail',{
        title:'Chi tiết bài hát',
        song:song,
        singer:singer,
        topic:topic
    })
}

export const like = async(req: Request, res: Response) =>{
    const {id,type} = req.body;
    const song = await Song.findOne({
        _id:id,
        deleted:false,
        status:'active'
    }).select('like');

    let updateSongLike:number=song.like;
    if(type==='like'){
        updateSongLike=song.like+1;
    }else{
        updateSongLike=song.like-1;
    }
    await Song.updateOne({_id:id,status:'active',deleted:false},{
        like:updateSongLike
    })
    //Nếu người dùng xóa phần active trong frontend thì có thể tăng like vĩnh viễn
    //Nên là làm phần đăng nhập và đăng ký, phải đăng nhập mới có thể like 
    //Chuyển like trong model của song thành mảng chứa id của user đã like
    //Khi vào 1 bài hát thì kiểm tra id user thông qua res.locals.user có nằm trong like hay không

    res.json({
        code:200,
        updateSongLike:updateSongLike,
        message:'Like thành công'
    })
}

export const favorite = async(req: Request, res: Response) =>{
    const {id}=req.body;
    const data={
        //userId:res.locals.user.id,
        songId:id
    }
    let existFavoriteSong;
    try {
        existFavoriteSong=await FavoriteSong.findOne(data);
    } catch (error) {
        res.json({
            code:500,
            message:'Lỗi server'
        })
    }
    if(existFavoriteSong){
        await FavoriteSong.updateOne({
            //userId:res.locals.user.id,
        },{
            $pull:{
                songId:id
            }
        })
        res.json({
            code:200,
            message:'Xóa khỏi yêu thích thành công',
            status:''
        })
        return;
    }else{
        await FavoriteSong.updateOne({
            //userId:res.locals.user.id,
        },{
            $push:{
                songId:id
            }
        })
        res.json({
            code:200,
            message:'Thêm vào yêu thích thành công',
            status:'add'
        })
    }
    
}