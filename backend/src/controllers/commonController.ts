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
import EmployeeForm from "../models/EmployeeForm";
import { verifyToken } from "../helpers/generateToken";
import { generateAccessToken } from "../helpers/generateToken";



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
  };


  export const clientForgotPassword = async (
    req: Request<{}, {}, {}, { forgotPassword: string }>,
    res: Response<{ msg: string; signUp?: boolean }>,
    next: NextFunction
  ) => {
    const { forgotPassword } = req.query;
    await handleForgotPassword(forgotPassword, Client as any , Employee as any, res, next);
  };
  
  
  export const clientChangePassword = async (
    req: Request<{}, {}, { newPassword: string; email: string }>,
    res: Response<{ msg: string; changed?: boolean }>,
    next: NextFunction
  ) => {
    try {
      const { newPassword, email } = req.body;
  
      // Forward the request to the `changePassword` function
      await changePassword(newPassword, email, res, next, Client as any, Employee as any);
    } catch (error) {
      // Handle any errors that occur
      next(error);
    }
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
       await Employee.findByIdAndUpdate(userId, { refreshToken: null });
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


  export const profile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized." });
      }
  
      const clientData = await Client.findOne({ _id: userId });
      const employeeData = await Employee.findOne({ _id: userId });
  
      if (!clientData && !employeeData) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const profileData:any = clientData || employeeData;
  
      const filteredProfileData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
      };
  
      let employeeForm = null;
      if (employeeData) {
        employeeForm = await EmployeeForm.findOne({ email: employeeData.email });
      }
  
      return res.status(200).json({ address: filteredProfileData, form: employeeForm });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return res.status(500).json({ message: "Server error." });
    }
  };

  export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const refreshToken = req.cookies.jwtRefreshToken;
    console.log("#####refreshToken:#####", refreshToken);
  
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }
  
    const secret = process.env.REFRESH_TOKEN_SECRET;
    console.log("REFRESH_TOKEN_SECRET:", secret);
  
    if (!secret) {
      return res
        .status(500)
        .json({ message: "Server configuration error. No secret defined." });
    }
  
    const payload = verifyToken(refreshToken, secret);
  
    if (!payload || typeof payload !== "object" || !("userId" in payload)) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
  
    try {
      const client = await Client.findById(payload.userId);
      const employee = await Employee.findById(payload.userId);
      const idData = client  || employee 

      if (!idData || idData.refreshToken !== refreshToken) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
  
      const newAccessToken = generateAccessToken(idData._id);
      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  };