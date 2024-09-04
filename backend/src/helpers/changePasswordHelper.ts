import { Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { IUser } from "../models/Client";
import { genSaltSync, hashSync } from 'bcryptjs';


export const changePassword = async (
    newPassword: string,
    email: string,
    res: Response<{ msg: string; changed?: boolean }>,
    next: NextFunction,
    userModel: Model<IUser>,
    empl: Model<IUser>,
  ) => {
    try {
      const user = await userModel.findOne({ email });
      const employee = await empl.findOne({ email });
      const auther = user || employee
      if (!auther) {
        return res.status(404).json({ msg: "User not found" });
      }
  
       const salt = genSaltSync(10);
    const hash = hashSync(newPassword, salt);
    auther.password = hash;
      await auther.save();
  
      res.status(200).json({ msg: "Password changed successfully", changed: true });
    } catch (error) {
      next(error);
    }
  };