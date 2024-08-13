import { Response,NextFunction } from "express";
import { IUser } from "../models/Client";
import {Model} from 'mongoose';


export const handleMailCheck=async(
    email:string,
    userModel:Model<IUser>,
    res:Response<{msg:string,loginMail:boolean}>,
    next:NextFunction
)=>{
    try {
        const user: IUser | null = await userModel.findOne({ email });
        if(!user){
            return res.status(401).json({msg:"Please do signup",loginMail: false})
        }
        return res.status(200).json({msg:"have account wiht this email please login",
            loginMail:true
        })
    } catch (error) {
        next(error);
    }
}