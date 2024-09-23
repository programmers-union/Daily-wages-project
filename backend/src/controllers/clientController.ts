import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Client from "../models/Client";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
import { generateAccessToken,  verifyToken,} from "../helpers/generateToken";
import {SignupClientRequestBody, ResendOtpRequestBody,EmailRequestBody} from "client/requests";
// import { handleForgotPassword } from "../helpers/forgotPasswordHelper";
// import {handleMailCheck} from "../helpers/loginMailCheckHelper";
import {  ErrorResponse, SuccessResponse } from "client/response";
// import { changePassword } from "../helpers/changePasswordHelper";
// import { handleLogin } from "../helpers/loginHelper";
import { verifyOtpHelper } from "../helpers/verifyHelper";
// import {handleResendOtp} from "../helpers/resendOtpHelper";
import JobRequest from "../models/JobRequest";
import findClosestJobTitle from "../utils/matchTitle";
import { genSaltSync, hashSync } from "bcryptjs";
import Employee from "../models/Employee";


export const signupClient = async (
  req: Request<{}, {}, SignupClientRequestBody>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Check if the email already exists in the Employee collection
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(401).json({
        msg: "Email is already registered with an employee",
        type: true,
      });
    }

    // Check if the email already exists in the Client collection
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(401).json({
        msg: "Email or password already exists",
        type: true,
      });
    }

    // Generate OTP and its expiry
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

    // Hash the password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    // Create new client
    const newClient = new Client({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      otp,
      otpExpiry,
    });

    // Save the client to the database
    await newClient.save();
 console.log(phoneNumber,'----',otp,'----')
    // Send OTP to the client's phone number
    await sendOtpToUser(phoneNumber, otp);

    return res.status(201).json({ msg: "OTP sent for verification" });
  } catch (err: any) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const verifyOtpClient = async (
  req: Request<{}, {}, { otp: string }>,
  res: Response,
  next: NextFunction
) => {
  const  otp  = req.body.otp;
  await verifyOtpHelper(otp, Client as any, res, next);
};


export const handleJobRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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


