import { Request,Response } from "express";
import Topic from "../../model/topics.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

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