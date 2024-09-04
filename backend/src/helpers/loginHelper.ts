import { Response, NextFunction } from "express";
import { IUser } from "../models/Client";
import { Model } from "mongoose";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/generateToken";
import { ErrorResponse, SuccessResponse } from "../types/client/response";
import { compareSync } from "bcryptjs";

export const handleLogin = async (
  email: string,
  password: string,
  userModel: Model<IUser>,
  empl: Model<IUser>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  try {
    // Try to find the user in both user and employee models
    const user: IUser | null = await userModel.findOne({ email });
    const employee: IUser | null = user ? null : await empl.findOne({ email });

    // Check if neither user nor employee exists
    if (!user && !employee) {
      return res.status(401).json({
        msg: "There is no account with this email. Please sign up.",
        loginSuccess: false,
      });
    }

    const account = user || employee;

    // Check if the password is not set for the account
    if (!account?.password) {
      return res
        .status(400)
        .json({ msg: "User password not set.", loginSuccess: false });
    }

    // Compare the provided password with the stored hash
    const isMatch = compareSync(password, account.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", loginSuccess: false });
    }

    // Generate access and refresh tokens
    const { accessToken, expiresIn } = generateAccessToken(String(account._id));
    const refreshToken = generateRefreshToken(String(account._id));

    // Update the account with the new refresh token
    account.refreshToken = refreshToken;
    await account.save();

    // Set the refresh token in a cookie
    res.cookie("jwtRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });

    // Return the login success response
    return res.status(200).json({
      msg: "Login successful",
      loginSuccess: true,
      isCheck: !!user,
      accesstoken: accessToken,
      expiresin: expiresIn,
    });
  } catch (error) {
    next(error);
  }
};
