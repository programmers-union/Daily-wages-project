import { Model, Document } from "mongoose";
import { Response, NextFunction } from "express";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
import { sendOtpViaEmail } from "../services/mailService";
import { ErrorResponse, SuccessResponse } from "client/response";

interface User extends Document {
  email: string;
  phoneNumber?: string;
  otp?: string;
  otpExpiry?: Date;
}

export const handleResendOtp = async (
  email: string,
  box: number,
  userModel: Model<User>,
  emplModel: Model<User>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  try {
    console.log("Box:", box);

    let account: User | null = null;
    let noBoxData: User | null = null;

    if (box === 0) {
      noBoxData = await emplModel.findOne({ email }) || await userModel.findOne({ email });
    } else if (box === 1) {
      account = await emplModel.findOne({ email });
    } else {
      account = await userModel.findOne({ email });
    }

    if (!account && !noBoxData) {
      return res.status(404).json({ msg: "User not found" });
    }

    const targetAccount = account || noBoxData;
    if (!targetAccount) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("Account:", targetAccount);

    const otp = generateOtp();
    targetAccount.otp = otp;
    targetAccount.otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry
    await targetAccount.save();

    if (box === 1) {
      console.log("Attempting to send OTP via email...");
      try {
        await sendOtpViaEmail(email, otp);
        console.log("OTP sent successfully via email");
      } catch (error) {
        console.error("Failed to send OTP via email:", error);
        return res.status(500).json({ msg: "Failed to send OTP via email" });
      }
    } else {
      console.log("Attempting to send OTP via phone...");
      if (!targetAccount.phoneNumber) {
        return res.status(400).json({ msg: "Phone number not provided" });
      }
      try {
        await sendOtpToUser(targetAccount.phoneNumber, otp);
        console.log("OTP sent successfully via phone");
      } catch (error) {
        console.error("Failed to send OTP via phone:", error);
        return res.status(500).json({ msg: "Failed to send OTP via phone" });
      }
    }

    res.status(200).json({ msg: "OTP resent successfully" });
  } catch (error) {
    console.error("Error in handleResendOtp:", error);
    next(error);
  }
};