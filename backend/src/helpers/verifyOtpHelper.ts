import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

interface OtpRequestBody {
  otp: string;
}

interface OtpResponse {
  msg: string;
  otpVerified?: boolean;
}

const verifyOtpHelper = async (
  req: Request<{}, {}, OtpRequestBody>,
  res: Response<OtpResponse>,
  next: NextFunction,
  Model: Model<any>,
  generateToken: (id: string) => string
) => {
  const { otp } = req.body;

  try {
    const user = await Model.findOne({ otp });
    if (!user) {
      return res.status(404).json({ msg: "User not found with the provided OTP" });
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
    await user.save();

    const token = generateToken(String(user._id));
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json({ msg: "OTP verified successfully", otpVerified: true });
  } catch (error) {
    next(error);
  }
};

export default verifyOtpHelper;