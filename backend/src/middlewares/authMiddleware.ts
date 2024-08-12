import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/generateToken";
import { getUserIdFromToken } from "../helpers/generateToken";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    console.log("Invalid token format");
    return res.status(401).send("Invalid token format.");
  }

  const token = parts[1];
  console.log("token:", token);

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    return res.status(500).send("Server configuration error. No secret defined.");
  }

  
    const payload = verifyToken(token, secret);
    if (payload) {
      (req as any).userId = payload.userId;
      next(); 
    } else {
      return res.status(400).send("Invalid or expired access token.");
    }
  } catch (error) {
    
    console.error("Token verification error:", error);
    return res.status(400).send("Invalid or expired access token.");
  }
};


export default authMiddleware;