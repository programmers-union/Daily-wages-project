import { Response, NextFunction } from "express";
import { IUser } from "../models/Client";
import { Model } from "mongoose";
import { generateAccessToken } from "../helpers/generateToken";
import { ErrorResponse, SuccessResponse } from "../types/client/response"
import { compareSync } from "bcryptjs";


export const handleLogin = async (
  email: string,
  password: string,
  userModel: Model<IUser>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const user: IUser | null = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "There is no account with this email. Please sign up.", loginSuccess: false });
    }
    if (!user.password) {
        return res.status(400).json({ msg: "User password not set.", loginSuccess: false });
      }
      
    const isMatch = compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials", loginSuccess: false });
    }

    const token = generateAccessToken(String(user._id));
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json({ msg: "Login successful", loginSuccess: true });
  } catch (error) {
    next(error);
  }
};


