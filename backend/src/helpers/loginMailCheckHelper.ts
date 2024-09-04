import { Response, NextFunction } from "express";
import { IUser } from "../models/Client";
import { Model } from "mongoose";
import Employee from "../models/Employee";

export const handleMailCheck = async (
  email: string,
  userModel: Model<IUser>,
  empl: Model<IUser>,
  res: Response<{
    msg: string;
    loginMail: boolean;
    // client?: boolean;
    // employee?: boolean;
  }>,
  next: NextFunction
) => {

  try {
    const user: IUser | null = await userModel.findOne({ email });
    const employee: IUser | null = await empl.findOne({ email });
    if (!user && !employee) {
      return res
        .status(401)
        .json({ msg: "Please do signup", loginMail: false });
    }
    // if (user) {
    //  return res
    //     .status(200)
    //     .json({
    //       msg: "have account wiht this email please login",
    //       loginMail: true,
    //       client: true,
    //     });
    // }
    return res
      .status(200)
      .json({
        msg: "have account wiht this email please login",
        loginMail: true,
        // employee: true,
      });
  } catch (error) {
    next(error);
  }
};
