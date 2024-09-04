import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Employee from "../models/Employee";
import EmployeeForm from "../models/EmployeeForm";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
import { handleForgotPassword } from "../helpers/forgotPasswordHelper";
import { changePassword } from "../helpers/changePasswordHelper";
import { handleMailCheck } from "../helpers/loginMailCheckHelper";
import bcrypt from "bcryptjs";
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



export const signupEmployee = async (
  req: Request<{}, {}, SignupEmployeeRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: 'Worker validation failed', errors: errors.array() });
  }

  const {
    firstName, lastName, email, dob, password, phoneNumber, gender,
    address, selectState, selectDistrict, selectCity, pinCode,
    skills, qualification, experience, skillLevel, holderName,
    accoutNumber, bank, ifsc, branch, linkPhoneNumber, idProof, uniqueId,
  } = req.body;

  try {
    // Extract files from the request
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    console.log(files,'765765')
    const idProofFile = files?.['idProofFile']?.[0];
    const profilePicture = files?.['profilePicture']?.[0];
console.log(idProofFile,'1212')
console.log(profilePicture,'0000')
    // Upload files to Cloudinary if they exist
    const proofPIC = idProofFile ? await uploadToCloudinary(idProofFile.buffer) : '';
    const profilePic = profilePicture ? await uploadToCloudinary(profilePicture.buffer) : '';
    console.log("proofPIC:",proofPIC);
    console.log("profilePic:",profilePic);
    // ... rest of the controller code ...

    const newEmployeeFormData = new EmployeeForm({
      dob, gender, address, selectState, selectDistrict, selectCity, pinCode,
      skills, qualification, experience, skillLevel, holderName, accoutNumber,
      bank, ifsc, branch, linkPhoneNumber, idProof, uniqueId,
      idProofFile: proofPIC, profilePic,
    });
    await newEmployeeFormData.save();

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
  
  console.log(req.body,'otp body');
  const { otp } = req.body;
  console.log(otp,'otp');
  console.log(Employee,'Employee,,,,,,,')
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

