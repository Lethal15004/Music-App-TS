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