import { Request,Response,NextFunction } from "express";
import streamUpload from '../../helper/streamUpload.helper';

export const uploadSingle= async (req:Request,res:Response,next:NextFunction)=>{
    if(req["file"]){
      const uploadToCloudinary= async (buffer)=>{
          let result= await streamUpload(buffer);
          req.body[req["file"].fieldname]=result["url"];
      }
      await uploadToCloudinary(req["file"].buffer);
      next();
    }
    else{
      next();
    } 

}
export const uploadFields=async(req:Request,res:Response,next:NextFunction)=>{
  if(req['files']){
    try{
      for(const key in req['files']){
        req.body[key] = [];
        const array= req['files'][key];
        for(const item of array){
          let result = await streamUpload(item.buffer);
          req.body[key].push(result['url']);
        }
      }
      next();
    }catch(error) {
      console.log(error);
    }
  }
}