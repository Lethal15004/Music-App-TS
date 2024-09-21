import { Request,Response } from "express";
import Topic from "../../model/topics.model";
// [GET] /admin/dashboard
export const index =async (req:Request,res:Response)=>{
    const topics = await Topic.find({
        status:'active',
        deleted:false
    });
    res.render('admin/pages/topic/index',{
        title:'Tổng quan',
        topics:topics
    });
}