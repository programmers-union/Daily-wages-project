import { Request, Response } from "express";
import Client from "../models/Client";
import { generateAccessToken, generateRefreshToken } from "../helpers/generateToken";


export const googleAuthCallback = async (req: Request, res: Response) => {
  console.log("object");

  if (!req.user || typeof req.user !== "object") {
    return res.status(400).send("User is not authenticated");
  }

  const userId = (req.user as any)._id.toString(); // Get the user ID
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  try {
    const user = await Client.findById(userId); // Use the extracted userId
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.cookie("jwtRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    console.log("Setting cookie:", res.getHeaders()["set-cookie"]);

    res.status(200).json({
      msg: "OTP verified successfully",
      otpVerified: true,
      accessToken,
    });

    res.redirect(`${process.env.API_URL}`);
  } catch (error) {
    console.error("Error during Google auth callback:", error);
    res.status(500).send("An error occurred during authentication");
  }
};


export const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user !== "object") {
    return res.status(400).send("User is not authenticated");
  }

  const client = await Client.findById((req.user as any)._id);
  if (!client) {
    return res.status(404).send("User not found");
  }

  res.send(client);
};

