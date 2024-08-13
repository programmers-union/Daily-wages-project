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



export const signupEmployee = async (
  req: Request<{}, {}, SignupEmployeeRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    email,
    dob,
    password,
    phoneNumber,
    gender,
    address,
    state,
    district,
    city,
    pinCode,
    skills,
    qualification,
    experience,
    skillLevel,
    holderName,
    accountNumber,
    bank,
    ifsc,
    branch,
    linkedPhoneNumber,
    idProof,
    uniqueId,
    idProofFile,
  } = req.body;

  try {
    let employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(409).json({ msg: "Employee with this email already exists" });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      otp,
      otpExpiry,
    });

    await newEmployee.save();
    // await sendOtpToUser(phoneNumber, otp);

    const newEmployeeFormData = new EmployeeForm({
      dob,
      gender,
      address,
      state,
      district,
      city,
      pinCode,
      skills,
      qualification,
      experience,
      skillLevel,
      holderName,
      accountNumber,
      bank,
      ifsc,
      branch,
      linkedPhoneNumber,
      idProof,
      uniqueId,
      idProofFile,
    });
    await newEmployeeFormData.save();

    res.status(201).json({ msg: "OTP sent for verification" });
  } catch (error) {
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


export const resendOtpEmployee = async (
  req: Request<{}, {}, ResendOtpEmployeeRequestBody>,
  res: Response<SuccessResponseEmployee | ErrorResponseEmployee>,
  next: NextFunction
) => {
  const email = req.body.otp.signup;
  await handleResendOtp(email as any,Employee as any,res,next);
 
};


export const loginMailCheck = async (
  req: Request<{}, {}, EmailRequestBody>,
  res: Response<SuccessResponse | ErrorResponseEmployee>,
  next: NextFunction
) => {
  const { loginData } = req.query;
  let parsedLoginData: { email?: string };
  try {
    parsedLoginData = JSON.parse(loginData as string);
  } catch (error) {
    return res.status(400).json({ msg: "Invalid loginData", error });
  }
  const { email } = parsedLoginData;
  await handleMailCheck(email as string, Employee as any,res,next);
};


export const loginEmployee = async (
req: Request<{}, {}, LoginRequestBody>,
res: Response<SuccessResponse | ErrorResponse>,
next: NextFunction
) => {
const { email, password } = req.body;
await handleLogin(email, password, Employee as any, res, next);
};

export const employeeForgotPassword = async (
  req: Request<{}, {}, {}, { forgotPassword: string }>,
  res: Response<{ msg: string; signUp?: boolean }>,
  next: NextFunction
) => {
  const { forgotPassword } = req.query;
  await handleForgotPassword(forgotPassword, Employee as any, res, next);
};


export const employeeChangePassword = async (
  req: Request<{}, {}, { newPassword: string; email: string }>,
  res: Response<{ msg: string; changed?: boolean }>,
  next: NextFunction
) => {
  const { newPassword, email } = req.body;
  await changePassword(newPassword, email, res, next, Employee as any);
};