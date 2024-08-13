import {Response,NextFunction} from "express";
import{Document,Model} from "mongoose";
import{generateOtp,sendOtpToUser} from "../helpers/otpHelper";
import { sendOtpViaEmail } from "../services/mailService";
import { IUser } from "../models/Client";


export const handleForgotPassword = async (
    identifier: string,
    userModel: Model<IUser>,
    res: Response<{ msg: string; signUp?: boolean }>,
    next: NextFunction
  ) => {
    try {
      if (!identifier) {
        return res.status(400).json({ msg: 'Identifier is required' });
      }
  
      const isEmail = identifier.includes('@');
      let user: IUser | null;
  
      if (isEmail) {
        user = await userModel.findOne({ email: identifier });
      } else {
        user = await userModel.findOne({ phoneNumber: identifier });
      }
  
      if (!user) {
        return res.status(401).json({ msg: 'Please sign up', signUp: false });
      }
  
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
  
      if (isEmail) {
        await sendOtpViaEmail(identifier, otp);
      } else {
        await sendOtpToUser(identifier, otp);
      }
  
      return res.status(200).json({ msg: 'OTP sent successfully' });
    } catch (error) {
      next(error);
    }
  };