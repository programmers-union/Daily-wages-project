import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Client from "../models/Client";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
import { sendOtpViaEmail } from "../services/mailService";
import { generateToken } from "../helpers/generateToken";
import bcrypt from "bcryptjs";
import { SignupClientRequestBody,ResendOtpRequestBody,VerifyOtpRequestBody,EmailRequestBody,LoginRequestBody } from "client/requests";
import { ErrorResponse, SuccessResponse } from "client/response";



export const signupClient = async (
  req: Request<{},{},SignupClientRequestBody>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: "Validation failed", errors: errors.array() });

  }
  // console.log(req.body);
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    let client = await Client.findOne({ email });

    if (client) {
      return res.status(409).json({ msg: "Client with this email already exist" });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newClient = new Client({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      otp,
      otpExpiry,
    });

    await newClient.save();

    // await sendOtpToUser(phoneNumber, otp);

    res.status(201).json({ msg: "OTP send for verification" });
  } catch (err: any) {
    next(err);
  }
};


export const verifyOtp = async (
  req: Request<{}, {}, VerifyOtpRequestBody>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  console.log("reached here")
  const { otp } = req.body;
  console.log("otp:",otp);
  try {
    const client = await Client.findOne({ otp });
    console.log("client:",client);
    if (!client) {
      return res.status(404).json({ msg: "Client not found with the provided OTP" });
    }
    if (client.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    const currentTime = new Date();
    if (client.otpExpiry && client.otpExpiry < currentTime) {
      return res.status(400).json({ msg: "OTP has expired" });
    }
    client.otp = undefined;
    client.isVerified = true;
    await client.save();

    const token = generateToken(String(client._id));

    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    res
      .status(200)
      .json({ msg: "OTP verified successfully", otpVerified: true });
  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (
  req: Request<{}, {}, ResendOtpRequestBody>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  const { email } = req.body.signup;

  try {
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }
    const otp = generateOtp();
    const otpExpiry=new Date(Date.now() + 15 * 60 * 1000);
    client.otp = otp;
    client.otpExpiry=otpExpiry;
    await client.save();
    await sendOtpToUser(client.phoneNumber, otp);
    res.status(200).json({ msg: "OTP resent successfully" });
  } catch (error) {
    next(error);
  }
};


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
    return res.status(400).json({ msg: "Invalid loginData format", error });
  }

  const { email } = parsedLoginData;
  try {
    const client = await Client.findOne({email});
    if (!client) {
      return res.status(401).json({ msg: "please do signup", signup: false });
    }
    return res
      .status(200)
      .json({
        msg: "have account with this email please enter password",
        loginMail: true,
      });
  } catch (error) {
    next(error);
  }
};


export const loginClient = async (
  req: Request<{},{},LoginRequestBody>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  const { email, password } = req.body;
 
  try {
    const client = await Client.findOne({ email });
    if (!client) {
      return res
        .status(401)
        .json({ msg: "there is no account with this email need to signup" });
    }
    // console.log(client.password);
    const isMatch = await bcrypt.compare(password, client.password);
    // console.log("isMatch:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid credentials" });
    }
    const token = generateToken(String(client._id));
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    return res
      .status(200)
      .json({ msg: "Login Successful", loginSuccess: true });
  } catch (error) {
    next(error);
  }
};


export const forgotPassword = async (
  req: Request<{}, {}, {}, { forgotPassword: string }>,
  res: Response<{ msg: string; signUp?: boolean }>,
  next: NextFunction
) => {
  const { forgotPassword } = req.query;

  try {
    if (!forgotPassword) {
      return res.status(400).json({ msg: "Identifier is required" });
    }

    const identifier = forgotPassword as string;
    const isEmail = identifier.includes('@');
    let client;

    if (isEmail) {
     const client = await Client.findOne({ email: identifier });
      if (!client) {
        return res.status(401).json({ msg: "Please sign up", signUp: false });
      }
    } else {
      client = await Client.findOne({ phoneNumber: identifier });
      if (!client) {
        return res.status(401).json({ msg: "Please sign up", signUp: false });
      }
    }

    if (client) {
      const otp = generateOtp();
      const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
      client.otp = otp;
      client.otpExpiry = otpExpiry;
      await client.save();

      if (isEmail) {
        await sendOtpViaEmail(identifier, otp);
      } else {
        await sendOtpToUser(identifier, otp);
      }

      return res.status(200).json({ msg: "OTP sent successfully" });
    }

  } catch (error) {
    next(error);
  }
};


export const changePassword=async(
  req:Request<{},{},{newPassword:string,email:string}>,
  res:Response<{msg:string,changed?:boolean}>,
  next:NextFunction
)=>{
  const {newPassword,email}=req.body;
  

  try {
    const client=await Client.findOne({email})
    if(!client){
      return res.status(404).json({msg:"Client not found"});
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(newPassword,salt);
    client.password=hashedPassword;
    await client.save();
    res.status(200).json({msg:"passsword changed successfully",changed:true});
  } catch (error) {
    next(error);
  }
}






