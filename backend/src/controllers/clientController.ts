import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Client from "../models/Client";
import { generateOtp, sendOtpToUser } from "../helpers/otpHelper";
import { sendOtpViaEmail } from "../services/mailService";
import {
  generateRefreshToken,
  generateAccessToken,
  verifyToken,
} from "../helpers/generateToken";
import bcrypt from "bcryptjs";
import {
  SignupClientRequestBody,
  ResendOtpRequestBody,
  VerifyOtpRequestBody,
  EmailRequestBody,
  LoginRequestBody,
} from "client/requests";
import { ErrorResponse, SuccessResponse } from "client/response";
import findClosestJobTitle from "../utils/matchTitle";
import JobRequest from "../models/JobRequest";
import dotenv from "dotenv";
dotenv.config();

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
  // console.log(req.body);
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    let client = await Client.findOne({ email });

    if (client) {
      return res
        .status(409)
        .json({ msg: "Client with this email already exist" });
    }

    const otp = generateOtp();
    console.log("otppp:", otp);
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

    await sendOtpToUser(phoneNumber, otp);

    res.status(201).json({ msg: "OTP send for verification" });
  } catch (err: any) {
    next(err);
  }
};

export const verifyOtp = async (
  req: Request<{}, {}, ResendOtpRequestBody>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  const { otp } = req.body.otp;

  try {
    const client = await Client.findOne({ otp });
    console.log("client:", client);
    if (!client) {
      return res
        .status(404)
        .json({ msg: "Client not found with the provided OTP" });
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

    const { accessToken, expiresIn } = generateAccessToken(String(client._id));
    const refreshToken = generateRefreshToken(String(client._id));
    client.refreshToken = refreshToken;
    await client.save();

    res.cookie("jwtRefreshToken", refreshToken, {
      httpOnly: true,
       secure: true,
       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
      path: "/",
    });


    res.status(200).json({
      msg: "OTP verified successfully",
      otpVerified: true,
      accessToken: accessToken,
      expiresIn: expiresIn,
    });
  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (
  req: Request<{}, {}, ResendOtpRequestBody>,
  res: Response<SuccessResponse | ErrorResponse>,
  next: NextFunction
) => {
  console.log("one");
  const email = req.body.otp.signup;
  console.log(email, "emil");
  try {
    const client = await Client.findOne({ email });
    console.log(client, "clie");
    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
    client.otp = otp;
    client.otpExpiry = otpExpiry;
    await client.save();
    await sendOtpToUser(client.phoneNumber as string, otp);
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
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ msg: "please do signup", signup: false });
    }
    return res.status(200).json({
      msg: "have account with this email please enter password",
      loginMail: true,
    });
  } catch (error) {
    next(error);
  }
};

export const loginClient = async (
  req: Request<{}, {}, LoginRequestBody>,
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
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid credentials" });
    }
    const token = generateAccessToken(String(client._id));
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    return res
      .status(200)
      .json({ msg: "Login Successful", loginSuccess: true });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request<{}, {}, {}, { forgotPassword: string; forgotCheckBox: string }>,
  res: Response<{ msg: string; signUp?: boolean }>,
  next: NextFunction
) => {
  console.log("first");
  const { forgotPassword, forgotCheckBox } = req.query;
  console.log(forgotCheckBox, "90");
  console.log(forgotCheckBox, "100");
  try {
    if (!forgotPassword) {
      return res.status(400).json({ msg: "Identifier is required" });
    }
    const identifier = forgotPassword as string;
    const isEmail = identifier.includes("@");
    let client;

    if (isEmail) {
      client = await Client.findOne({ email: identifier });
    } else {
      client = await Client.findOne({ phoneNumber: identifier });
    }

    if (!client) {
      return res.status(401).json({ msg: "Please sign up", signUp: true });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
    client.otp = otp;
    client.otpExpiry = otpExpiry;
    await client.save();

    if (forgotCheckBox === "1") {
      await sendOtpViaEmail(client.email, otp);
    } else {
      await sendOtpToUser(client.phoneNumber, otp);
    }

    return res.status(200).json({ msg: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request<{}, {}, { newPassword: string; email: string }>,
  res: Response<{ msg: string; changed?: boolean }>,
  next: NextFunction
) => {
  const { newPassword, email } = req.body;

  try {
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    client.password = hashedPassword;
    await client.save();
    res
      .status(200)
      .json({ msg: "passsword changed successfully", changed: true });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here");
  console.log(req.body)
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
    console.log(newAccessToken,'&&&&&&&&&&&&&')
    return res.json({ accessToken: newAccessToken , msg:'new Aceess token generated' });
  } catch (error) {
    next(error);
  }
};

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.json({ msg: "hey i am back" });
};

export const handleJobRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobTitle, date, time, description, location } = req.body;

    const dateOnly = new Date(date);
    if (isNaN(dateOnly.getTime())) {
      return res.status(400).json({ msg: "Invalid date format" });
    }

    // Find closest job title
    const closestItem = await findClosestJobTitle(jobTitle);
    if (!closestItem) {
      return res.status(404).json({ msg: "No matching job title found" });
    }
    // Create and save new job request
    const newJobRequest = new JobRequest({
      jobTitle: closestItem._id,
      date: dateOnly,
      time,
      description,
      location,
    });

    await newJobRequest.save();
    return res.status(201).json({ msg: "Job request added successfully" });
  } catch (error) {
    console.error("Error in handleJobRequest:", error);
    next(error);
  }
};
