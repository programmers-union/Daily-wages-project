import { EmailRequestBody, LoginRequestBody, ResendOtpRequestBody } from "client/requests";
import { ErrorResponse, SuccessResponse } from "client/response";
import { Request, Response, NextFunction } from "express";
import { handleMailCheck } from "../helpers/loginMailCheckHelper";
import Client from "../models/Client";
import { handleLogin } from "../helpers/loginHelper";
import Employee from "../models/Employee";
import { handleForgotPassword } from "../helpers/forgotPasswordHelper";
import { changePassword } from "../helpers/changePasswordHelper";
import { handleResendOtp } from "../helpers/resendOtpHelper";



export const loginMailCheck = async (
    req: Request<{}, {}, EmailRequestBody>,
    res: Response<SuccessResponse | ErrorResponse>,
    next: NextFunction
  ) => {

    const { loginData } = req.query;
    let parsedLoginData: { email?: string };
    try {
      parsedLoginData = JSON.parse(loginData as string);
    } catch (error) {
      return res.status(400).json({ msg: "Invalid loginData", error});
    }
    const { email } = parsedLoginData;
    await handleMailCheck(email as string, Client as any, Employee as any,res,next);
  };

  export const loginClient = async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response<SuccessResponse | ErrorResponse>,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    await handleLogin(email, password, Client as any, Employee as any , res, next);
    // await handleLogin(email, password, Employee as any, res, next);
  };


  export const clientForgotPassword = async (
    req: Request<{}, {}, {}, { forgotPassword: string }>,
    res: Response<{ msg: string; signUp?: boolean }>,
    next: NextFunction
  ) => {
    console.log(req.body,'5555555555555555555')
    const { forgotPassword } = req.query;
    await handleForgotPassword(forgotPassword, Client as any , Employee as any, res, next);
  };
  
  
  export const clientChangePassword = async (
    req: Request<{}, {}, { newPassword: string; email: string }>,
    res: Response<{ msg: string; changed?: boolean }>,
    next: NextFunction
  ) => {
    console.log(req.body,'body body body---------------')
    const { newPassword, email } = req.body;
    await changePassword(newPassword, email, res, next, Client as any , Employee as any);
  };

  export const resendOtp = async (
    req: Request<{}, {}, ResendOtpRequestBody>,
    res: Response<SuccessResponse | ErrorResponse>,
    next: NextFunction
  ) => {
    const email = req.body.otp.signup;
    console.log(email,'000000')
    const box = req.body.forgotCheckBox;
    await handleResendOtp(email as any,box as any ,Client as any , Employee as any ,res,next);
   
  };

  export const clientLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = (req as any).userId;
      if (!userId) {
        return res.status(403).send("User not authenticated");
      }
      await Client.findByIdAndUpdate(userId, { refreshToken: null });
      res.clearCookie('jwtRefreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        path: '/' 
      });
  
      return res.status(200).json({ msg: "Removed refresh token for logout", type: true });
    } catch (error) {
      next(error);
    }
  };