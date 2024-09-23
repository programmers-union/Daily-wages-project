import { Model } from "mongoose";
import { Response, NextFunction } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/generateToken";
import { SuccessResponse, ErrorResponse, DBClient } from "../types/client/response";

interface User {
  otp: string | undefined;
  otpExpiry: Date;
  isVerified: boolean;
  refreshToken?: string;
  save: () => Promise<void>;
}

export const verifyOtpHelper = async (
  otp: string,
  userModel: Model<User>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {

  try {
    const user = await userModel.findOne({ otp });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found with the provided OTP" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    const currentTime = new Date();
    if (user.otpExpiry && user.otpExpiry < currentTime) {
      return res.status(400).json({ msg: "OTP has expired" });
    }
    user.otp = undefined;
    user.isVerified = true;
    const { accessToken, expiresIn } = generateAccessToken(String(user._id));
    const refreshToken = generateRefreshToken(String(user._id));
    console.log(refreshToken,'genrara;8888')
    user.refreshToken = refreshToken;
    await user.save();

    // Fetch client details and map to match the DBClient structure
    res.cookie('jwtRefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 
      maxAge: 5 * 24 * 60 * 60 * 1000, 
      
    });
    // Map clientDetails to match DBClient structure

    res.status(200).json({
      msg: "OTP verified successfully",
      otpVerified: true,
      accesstoken: accessToken,
      expiresin: expiresIn,
    });
  } catch (error) {
    next(error);
  }
};