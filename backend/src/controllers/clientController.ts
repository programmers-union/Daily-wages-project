import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Client from "../models/Client";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
import { generateToken } from "../helpers/generateToken";
import bcrypt from 'bcryptjs';

export const signupClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    let client = await Client.findOne({ email });

    if (client) {
      return res.status(400).json({ msg: "Client already exist" });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newClient = new Client({
      firstName,
      lastName,
      email,
      password:hashedPassword,
      phoneNumber,
      otp,
      otpExpiry,
    });

    await newClient.save();

    await sendOtpToUser(phoneNumber, otp);

    res.json({ msg: "OTP send for verification" });
  } catch (err: any) {
    next(err);
  }
};


export const resendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body)
  const  {signup } = req.body.otp;
  const email = signup
console.log(email,'emial')
  try {
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }
    const otp = generateOtp();
    client.otp = otp;
    await client.save();
    await sendOtpToUser(client.phoneNumber, otp);
    res.status(200).json({ msg: "OTP resent successfully" });
  } catch (error) {
    next(error);
  }
};


export const verifyOtp=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const {otp}=req.body.otp;
    try {

      const client=await Client.findOne({otp});
      if(!client){
          return res.status(404).json({msg:"Client not found"})
      }
      if(client.otp !==otp){
          return res.status(400).json({msg:"Invalid OTP"});
      }
      client.otp=undefined;
      client.isVerified=true;
      await client.save();

      const token =generateToken(String(client._id));

      res.cookie('jwt',token,{httpOnly:true,maxAge:3600000});
      
      res.status(200).json({msg:"OTP verified successfully",otpVerified:true})
      
    } catch (error) {
      next(error);
    }
   
};

export const loginMailCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const client = await Client.findOne({email});
    if (!client) {
      return res.status(401).json({ msg: "please do signup", signUp: false });
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

export const loginClient=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  const {email,password}=req.body;
  try {
    const client=await Client.findOne({email});
    console.log(client,'client')
    if(!client){
      return res.status(401).json({msg:"there is no account with this mail need to signup"});
    }
    const isMatch=await bcrypt.compare(password,client.password);
    console.log("isMatch:",isMatch);
    if(!isMatch){
      return res.status(401).json({msg:"invalid credentials"});
    }
    const token =generateToken(String(client._id));
    res.cookie('jwt',token,{httpOnly:true,maxAge:3600000});
    
    return res.status(200).json({msg:"Login Successful"});
  } catch (error) {
    next(error);
  }
};



