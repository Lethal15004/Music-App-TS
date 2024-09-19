import { Request,Response } from "express";
import Topic from "../../model/topics.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import FavoriteSong from "../../model/favorite-song.model";

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
        song['likeCount']=song.like.length;
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

    if(res.locals.user){
        const existLikeSong = song.like.find(user => user === res.locals.user.id);
        try {
            const existFavoriteSong = await FavoriteSong.findOne({
                userId: res.locals.user.id,
                songId:song.id
            });
            if(existFavoriteSong){
                song['isFavorite'] = true
            }
            if(existLikeSong){
                song['isLike'] = true
            }
        } catch (error) {
            res.json({
                code:500,
                message:'Lỗi server'
            })
        } 
    }
    song['likeCount']=song.like.length;
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
    const {id} = req.body;
    try {
        const song = await Song.findOne({
            _id:id,
            deleted:false,
            status:'active',
        }).select('like');
        const userExist = song.like.find(user => user === res.locals.user.id);

        let newLikeCount : number = song.like.length;
        let status :string ='';
        if(userExist){
            await Song.updateOne({
                _id:id
            },{
                $pull:{
                    like:res.locals.user.id
                }
            })
            --newLikeCount;
        }else{
            await Song.updateOne({
                _id:id
            },{
                $push:{
                    like:res.locals.user.id
                }
            })
            status='add';
            ++newLikeCount;
        }
        res.json({
            code:200,
            status:status,
            newLikeCount:newLikeCount
        })
    } catch (error) {
        res.json({
            code:500,
            message:'Lỗi server'
        })
    }
}

export const favorite = async(req: Request, res: Response) =>{
    const {id}=req.body;
    const data={
        userId:res.locals.user.id,
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
    let status :string='';
    if(existFavoriteSong){
        await FavoriteSong.updateOne({
            userId:res.locals.user.id,
        },{
            $pull:{
                songId:id
            }
        })
    }else{
        await FavoriteSong.updateOne({
            userId:res.locals.user.id,
        },{
            $push:{
                songId:id
            }
        })
        status='add';
    }
    res.json({
        code:200,
        status:status
    })
    
}