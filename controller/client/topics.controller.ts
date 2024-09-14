import {Request,Response} from 'express';
import Topic from '../../model/topics.model';

export const index = async(req: Request, res:Response)=>{
    const topics = await Topic.find({deleted: false});
    res.render('client/pages/topics/index', {
        title:'Danh sách chủ đề'
    })
}
