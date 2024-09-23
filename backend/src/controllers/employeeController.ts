import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Employee from "../models/Employee";
import EmployeeForm from "../models/EmployeeForm";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
import { handleForgotPassword } from "../helpers/forgotPasswordHelper";
import { changePassword } from "../helpers/changePasswordHelper";
import { handleMailCheck } from "../helpers/loginMailCheckHelper";
import bcrypt, { genSaltSync, hashSync } from "bcryptjs";
import { ResendOtpEmployeeRequestBody,SignupEmployeeRequestBody,VerifyOtpEmployeeRequestBody,} from "../types/employee/request";
import {ErrorResponseEmployee,SuccessResponseEmployee,} from "../types/employee/response";
import { ErrorResponse } from "client/response";
import { EmailRequestBody, LoginRequestBody } from "../types/client/requests";
import { SuccessResponse } from "../types/client/response";
import { handleLogin } from "../helpers/loginHelper";
import {verifyOtpHelper} from "../helpers/verifyHelper";
import {handleResendOtp} from "../helpers/resendOtpHelper";
import uploadIcon from "../config/cloudinaryConfig";
import uploadToCloudinary from "../config/cloudinaryConfig";
import Client from "../models/Client";



export const signupEmployee = async (
  req: Request<{}, {}, SignupEmployeeRequestBody>,
  res: Response,
  next: NextFunction
) => {
  console.log("ivide ethyyy");
 console.log(req.body,'_____req body_____')
  const errors = validationResult(req);
  console.log("errors:------------",errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: 'Worker validation failed',
      errors: errors.array(),
    });
  }
  const {
    firstName, lastName, email, dob, password, phoneNumber, gender,
    address, selectState, selectDistrict, selectCity, pinCode,
    skills, qualification, experience, skillLevel, idProof, uniqueId,
  } = req.body;

  try {
    // Extract files from the request
    // const files = req.files as {
    //   [fieldname: string]: Express.Multer.File[];
    // } | undefined;
    // console.log('Files Received:', req.files);
    // const idProofFile = files?.['idProofFile']?.[0];
    // const profilePic = files?.['profilePic']?.[0];

    // Upload files to Cloudinary if they exist
    // const idProofFileUrl = idProofFile
    //   ? await uploadToCloudinary(idProofFile.buffer)
    //   : '';
    // const profilePicUrl = profilePic
    //   ? await uploadToCloudinary(profilePic.buffer)
    //   : '';

    // console.log('Uploaded ID Proof URL:', idProofFileUrl);
    // console.log('Uploaded Profile Pic URL:', profilePicUrl);

    const checkEmailInDb:any | null = await Client.findOne({email});
     if(checkEmailInDb){
     return res.status(401).json({msg:'email or password is already exists'});
     }
     let employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(409).json({ msg: "email or password  already exists" });
    }
    // Prepare new employee form data
    const newEmployeeFormData = new EmployeeForm({
      firstName, lastName, email, dob, password, phoneNumber, gender,
      address, selectState, selectDistrict, selectCity, pinCode,
      skills, qualification, experience, skillLevel, idProof, uniqueId
    });
     
    // Save the form data to the database
    await newEmployeeFormData.save();

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      password: hash,
      phoneNumber,
      otp,
      otpExpiry,
    });

    await newEmployee.save();

    await sendOtpToUser(phoneNumber, otp);
    // Send success response
    res.status(201).json({ msg: 'OTP sent for verification' });
  } catch (error) {
    console.error('Error in signupEmployee:', error);
    next(error);
  }
};

export const verifyOtpEmployee = async (
  req: Request<{}, {}, { otp: string }>,
  res: Response,
  next: NextFunction
) => {
  
  const { otp } = req.body;
  await verifyOtpHelper(otp, Employee as any, res, next);
};


// export const resendOtpEmployee = async (
//   req: Request<{}, {}, ResendOtpEmployeeRequestBody>,
//   res: Response<SuccessResponseEmployee | ErrorResponseEmployee>,
//   next: NextFunction
// ) => {
//   const email = req.body.otp.signup;
//   await handleResendOtp(email as any,Employee as any,res,next);
 
// };


// export const loginMailCheck = async (
//   req: Request<{}, {}, EmailRequestBody>,
//   res: Response<SuccessResponse | ErrorResponseEmployee>,
//   next: NextFunction
// ) => {
//   const { loginData } = req.query;
//   let parsedLoginData: { email?: string };
//   try {
//     parsedLoginData = JSON.parse(loginData as string);
//   } catch (error) {
//     return res.status(400).json({ msg: "Invalid loginData", error });
//   }
//   const { email } = parsedLoginData;
//   await handleMailCheck(email as string, Employee as any,res,next);
// };


// export const loginEmployee = async (
// req: Request<{}, {}, LoginRequestBody>,
// res: Response<SuccessResponse | ErrorResponse>,
// next: NextFunction
// ) => {
// const { email, password } = req.body;
// await handleLogin(email, password, Employee as any, res, next);
// };

// export const employeeForgotPassword = async (
//   req: Request<{}, {}, {}, { forgotPassword: string }>,
//   res: Response<{ msg: string; signUp?: boolean }>,
//   next: NextFunction
// ) => {
//   const { forgotPassword } = req.query;
//   await handleForgotPassword(forgotPassword, Employee as any ,Employee as any , res, next);
// };


// export const employeeChangePassword = async (
//   req: Request<{}, {}, { newPassword: string; email: string }>,
//   res: Response<{ msg: string; changed?: boolean }>,
//   next: NextFunction
// ) => {
//   const { newPassword, email } = req.body;
//   await changePassword(newPassword, email, res, next, Employee as any);
// };

