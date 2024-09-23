import { Response, NextFunction } from "express";
import { Model } from "mongoose";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
import { sendOtpViaEmail } from '../services/mailService';
import { IUser } from "../models/Client";

export const handleForgotPassword = async (
  identifier: string,
  userModel: Model<IUser>,
  empl: Model<IUser>,
  res: Response<{ msg: string; signUp?: boolean }>,
  next: NextFunction
) => {

  
  try {
    if (!identifier) {
      return res.status(400).json({ msg: 'Identifier is required' });
    }
    const isEmail = identifier.includes('@');
    const searchCriteria = isEmail
      ? { email: identifier }
      : { phoneNumber: identifier };

    const user = await userModel.findOne(searchCriteria);
    const employee = await empl.findOne(searchCriteria);

    if (!user && !employee) {
      return res.status(401).json({ msg: 'Please sign up', signUp: false });
    }

    const account = user || employee;
    if (!account) {
      return res.status(500).json({ msg: 'Account retrieval error' });
    }

    const otp = generateOtp();
    account.otp = otp;
    account.otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await account.save();

    if (isEmail) {
      try {
        await sendOtpViaEmail(identifier, otp);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Failed to send OTP via email: ${error.message}`);
          return res.status(500).json({ msg: 'Failed to send OTP via email' });
        }
        return res.status(500).json({ msg: 'Failed to send OTP via email' });
      }
    } else {
      try {
        await sendOtpToUser(identifier, otp);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Failed to send OTP via phone: ${error.message}`);
          return res.status(500).json({ msg: 'Failed to send OTP via phone' });
        }
        return res.status(500).json({ msg: 'Failed to send OTP via phone' });
      }
    }

    return res.status(200).json({ msg: 'OTP sent successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in handleForgotPassword: ${error.message}`);
    }
    next(error);
  }
};
