import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Employee from "../models/Employee";
import EmployeeForm from "../models/EmployeeForm";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
// import { generateToken } from "../helpers/generateToken";
import bcrypt from "bcryptjs";
import { ResendOtpEmployeeRequestBody, SignupEmployeeRequestBody,VerifyOtpEmployeeRequestBody } from "../types/employee/request";
import { ErrorResponseEmployee, SuccessResponseEmployee } from "employee/response";
import { generateAccessToken } from "../helpers/generateToken";
import { EmailRequestBody, LoginRequestBody } from "client/requests";
import { SuccessResponse } from "client/response";


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
  //  console.log("req.body:",req.body);

  try {
    let employee = await Employee.findOne({ email });
    console.log("employee:", employee);
    if (employee) {
      return res
        .status(409)
        .json({ msg: "Employee with this email already exist" });
    }

    const otp = generateOtp();
    console.log(otp);
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      password:hashedPassword,
      phoneNumber,
      otp,
      otpExpiry
    });

    await newEmployee.save();
    // await sendOtpToUser(phoneNumber,otp);
    
    const newEmployeeFormData=new EmployeeForm({
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
      idProofFile
    })
    await newEmployeeFormData.save();
    res.status(201).json({ msg: "OTP send for verification" });
    

  } catch (error) {
    next(error);
  }
};


export const verifyOtp= async(
  req:Request<{},{},VerifyOtpEmployeeRequestBody>,
  res:Response<SuccessResponseEmployee| ErrorResponseEmployee>,
  next:NextFunction
)=>{
  const {otp}=req.body;

  try {
    const employee=await Employee.findOne({otp});
    if(!employee){
      return res.status(404).json({msg:"Employee not found with the provided OTP"});
    }
    if(employee.otp !==otp){
      return res.status(400).json({msg:"Invalid OTP"});
    }
    const currentTime=new Date();
    if(employee.otpExpiry && employee.otpExpiry<currentTime){
       return res.status(400).json({msg:"OTP has expired"});
    }
    employee.otp=undefined;
    employee.isVerified=true;
    await employee.save();
    const token=generateAccessToken(String(employee._id));
    res.cookie("jwt",token,{httpOnly:true,maxAge:3600000});
    res.status(200).json({msg:"OTP verified successfully",otpVerified:true});
  } catch (error) {
    next(error);
  }
};


export const resendOtp=async(
  req:Request<{},{},ResendOtpEmployeeRequestBody>,
  res:Response<SuccessResponseEmployee | ErrorResponseEmployee>,
  next:NextFunction
)=>{
  const email = req.body.otp.signup;


  try {
    const employee=await Employee.findOne({email});

    if(!employee){
      return res.status(404).json({msg:"Client not found"})
    };
    const otp=generateOtp();
    const otpExpiry=new Date(Date.now() + 15 * 60 * 1000);
    employee.otp=otp;
    employee.otpExpiry=otpExpiry;
    await employee.save();
    await sendOtpToUser(employee.phoneNumber,otp);
    
  } catch (error) {
    next(error);
  }
}


export const loginMailCheck=async(
  req:Request<{},{},EmailRequestBody>,
  res:Response<SuccessResponse | ErrorResponseEmployee>,
  next:NextFunction
)=>{
  const {loginData}=req.query;
  let parsedLoginData:{email?:string};
  try {
    parsedLoginData=JSON.parse(loginData as string);
  } catch (error) {
    return res.status(400).json({msg:"invalid loginData",error});
  }
  const {email}=parsedLoginData;
  try {
    const employee=await Employee.findOne({email});
    if(!employee){
      return res.status(401).json({msg:"please do signup"})
    }
    return res.status(200).json({msg:"have account with this email please login",
      loginMail:true
    });
  } catch (error) {
    next(error);
  }
}

export const loginEmployee=async(
  req:Request<{},{},LoginRequestBody>,
  res:Response<SuccessResponse|ErrorResponseEmployee>,
  next:NextFunction
)=>{
  const {email,password}=req.body;
  try {
    const employee=await Employee.findOne({email});
    if(!employee){
      return res.status(401).json({msg:"there is no account with this email need to signup"});

    }
    const isMatch=await bcrypt.compare(password,employee.password);
    if(!isMatch){
      return res.status(400).json({msg:"invalid credentials"});
    }
    const token=generateAccessToken(String(employee._id));
    res.cookie("jwt",token,{httpOnly:true,maxAge:3600000});
    return res.status(200).json({msg:"Login Successfull",loginSuccess:true});
  } catch (error) {
    next(error)
  }
}

// export const forgotPassword = async (
//   req: Request<{}, {}, {}, { forgotPassword: string }>,
//   res: Response<{ msg: string; signUp?: boolean }>,
//   next: NextFunction
// ) => {
//   const { forgotPassword } = req.query;

//   try {
//     if (!forgotPassword) {
//       return res.status(400).json({ msg: "Identifier is required" });
//     }

//     const identifier = forgotPassword as string;
//     const isEmail = identifier.includes('@');
//     let employee;

//     if (isEmail) {
//     const  employee = await Employee.findOne({ email: identifier });
//       if (!employee) {
//         return res.status(401).json({ msg: "Please sign up", signUp: false });
//       }
//     } else {
//      const employee = await Employee.findOne({ phoneNumber: identifier });
//       if (!employee) {
//         return res.status(401).json({ msg: "Please sign up", signUp: false });
//       }
//     }

//     if (employee) {
//       const otp = generateOtp();
//       const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
//       employee.otp = otp;
//       employee.otpExpiry = otpExpiry;
//       await employee.save();

//       if (isEmail) {
//         await sendOtpViaEmail(identifier, otp);
//       } else {
//         await sendOtpToUser(identifier, otp);
//       }

//       return res.status(200).json({ msg: "OTP sent successfully" });
//     }

//   } catch (error) {
//     next(error);
//   }
// }; 






