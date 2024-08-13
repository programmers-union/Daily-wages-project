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
  ) => {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
       const salt = genSaltSync(10);
    const hash = hashSync(newPassword, salt);
      user.password = hash;
      await user.save();
  
      res.status(200).json({ msg: "Password changed successfully", changed: true });
    } catch (error) {
      next(error);
    }
  };