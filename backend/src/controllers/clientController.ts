import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Client from "../models/Client";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
import { generateAccessToken,  verifyToken,} from "../helpers/generateToken";
import {SignupClientRequestBody, ResendOtpRequestBody,EmailRequestBody, LoginRequestBody,} from "client/requests";
import { handleForgotPassword } from "../helpers/forgotPasswordHelper";
import {handleMailCheck} from "../helpers/loginMailCheckHelper";
import { ErrorResponse, SuccessResponse } from "client/response";
import { changePassword } from "../helpers/changePasswordHelper";
import { handleLogin } from "../helpers/loginHelper";
import { verifyOtpHelper } from "../helpers/verifyHelper";
import {handleResendOtp} from "../helpers/resendOtpHelper";
import JobRequest from "../models/JobRequest";
import findClosestJobTitle from "../utils/matchTitle";
import { genSaltSync, hashSync } from "bcryptjs";


export const signupClient = async (
  req: Request<{}, {}, SignupClientRequestBody>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ msg: "Validation failed", errors: errors.array() });
  }
  
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    let client = await Client.findOne({ email });

    if (client) {
      return res
        .status(409)
        .json({ msg: "Client with this email already exist" });
    }

    const otp = generateOtp();
    console.log("otp:",otp);
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    const newClient = new Client({
      firstName,
      lastName,
      email,
      password: hash,
      phoneNumber,
      otp,
      otpExpiry,
    });

    await newClient.save();

    await sendOtpToUser(phoneNumber, otp);

    res.status(201).json({ msg: "OTP send for verification" });
  } catch (err: any) {
    next(err);
  }
};


export const verifyOtpClient = async (
  req: Request<{}, {}, { otp: string }>,
  res: Response,
  next: NextFunction
) => {
  const  otp  = req.body.otp;
  console.log("otppppp:",otp);
  await verifyOtpHelper(otp, Client as any, res, next);
};


// export const resendOtpClient = async (
//   req: Request<{}, {}, ResendOtpRequestBody>,
//   res: Response<SuccessResponse | ErrorResponse>,
//   next: NextFunction
// ) => {
//   console.log(req.body,'----body---')
//   const email = req.body.otp.signup;
//   console.log("email:",email)
//   await handleResendOtp(email as any,Client as any,res,next);
 
// };

// export const loginMailCheck = async (
//   req: Request<{}, {}, EmailRequestBody>,
//   res: Response<SuccessResponse | ErrorResponse>,
//   next: NextFunction
// ) => {
//   const { loginData } = req.query;
//   let parsedLoginData: { email?: string };
//   try {
//     parsedLoginData = JSON.parse(loginData as string);
//   } catch (error) {
//     return res.status(400).json({ msg: "Invalid loginData", error});
//   }
//   const { email } = parsedLoginData;
//   await handleMailCheck(email as string, Client as any,res,next);
// };


// export const loginClient = async (
//   req: Request<{}, {}, LoginRequestBody>,
//   res: Response<SuccessResponse | ErrorResponse>,
//   next: NextFunction
// ) => {
//   const { email, password } = req.body;
//   await handleLogin(email, password, Client as any, res, next);
// };


// export const clientForgotPassword = async (
//   req: Request<{}, {}, {}, { forgotPassword: string }>,
//   res: Response<{ msg: string; signUp?: boolean }>,
//   next: NextFunction
// ) => {
//   const { forgotPassword } = req.query;
//   await handleForgotPassword(forgotPassword, Client as any, res, next);
// };


// export const clientChangePassword = async (
//   req: Request<{}, {}, { newPassword: string; email: string }>,
//   res: Response<{ msg: string; changed?: boolean }>,
//   next: NextFunction
// ) => {
//   console.log(req.body,'body body body')
//   const { newPassword, email } = req.body;
//   await changePassword(newPassword, email, res, next, Client as any);
// };




export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here");
  const refreshToken = req.cookies.jwtRefreshToken;
  console.log("refreshToken:", refreshToken);

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
  console.log("payload:", payload);

  if (!payload || typeof payload !== "object" || !("userId" in payload)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const client = await Client.findById(payload.userId);
    console.log("client:", client);

    if (!client || client.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(client._id);
    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};


export const handleJobRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body)
  try {
    const userId=(req as any).userId;
    const { jobTitle, date, time, description, location } = req.body;

    const dateOnly = new Date(date);
    if (isNaN(dateOnly.getTime())) {
      return res.status(400).json({ msg: "Invalid date format" });
    }

    
    const closestItem = await findClosestJobTitle(jobTitle);
    if (!closestItem) {
      return res.status(404).json({ msg: "No matching job title found" });
    }
    const newJobRequest = new JobRequest({
      jobTitle: closestItem._id,
      date: dateOnly,
      time,
      description,
      location,
      userId
    });

    await newJobRequest.save();
    return res.status(201).json({ msg: "Job request added successfully" });
  } catch (error) {
    console.error('Error in handleJobRequest:', error);
    next(error);
  }
};



export const getjobDataForCalender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(403).send("User not authenticated");
    }

    const calenderData = await JobRequest.find({ userId: userId }).populate({
      path: 'jobTitle',
      select: 'jobTitle' 
    });
  
    console.log("dataaaa:", calenderData);

    if (calenderData && calenderData.length > 0) {
      return res.status(200).json({ msg: "Successfully fetched the data", data: calenderData });
    } else {
      return res.status(404).json({ msg: "No data found" });
    }
  } catch (error) {
    next(error);
  }
};


export const editCalenderData=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  const {jobRequestId}=req.query;
  const updateData=req.body;
  console.log("updateData:",updateData);
  try {
    const updateJob=await JobRequest.findByIdAndUpdate(jobRequestId,updateData,{new:true});
    console.log("updateJob:",updateJob);
    if(!updateJob){
      return res.status(404).json({msg:"Job not found"});
    }
    return res.status(200).json({msg:"Updated job successfully"});
  } catch (error) {
    next(error)
  }
}


export const deleteCalenderData=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  const {jobRequestId}=req.query;
  if(!jobRequestId){
    return res.status(400).json({msg:"id requierd"});
  }
  try {
    const deleteJobRequest=await JobRequest.findByIdAndDelete({_id:jobRequestId});
    if (!deleteJobRequest) {
      return res.status(404).json({ message: 'Job request not found' });
    }
    return res.status(200).json({ message: 'Job request deleted successfully' });
  } catch (error) {
    next(error);
  }
}

