import { Model } from "mongoose";
import { Response, NextFunction } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/generateToken";
import { SuccessResponse, ErrorResponse } from "../types/client/response";

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
    console.log(" zero object");
    const { accessToken, expiresIn } = generateAccessToken(String(user._id));
    const refreshToken = generateRefreshToken(String(user._id));
    user.refreshToken = refreshToken;
    await user.save();
    console.log("ok");
    res.cookie("jwtRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", //
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
    let accesstoken = accessToken;
    let expiresin = expiresIn;
    res.status(200).json({
      msg: "OTP verified successfully",
      otpVerified: true,
      accesstoken,
      expiresin,
    });
  } catch (error) {
    next(error);
  }
};
