import { Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { generateOtp, sendOtpToUser } from '../helpers/otpHelper'; 
import { ErrorResponse, SuccessResponse } from "client/response"; 

interface User {
  email: string;
  phoneNumber?: string;
  otp?: string;
  otpExpiry?: Date;
  save: () => Promise<void>;
}

export const handleResendOtp = async (
  email: string,
  userModel: Model<User>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    await sendOtpToUser(user.phoneNumber as string, otp);

    res.status(200).json({ msg: 'OTP resent successfully' });
  } catch (error) {
    next(error);
  }
};