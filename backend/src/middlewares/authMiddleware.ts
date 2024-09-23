import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/generateToken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      console.log("Invalid token format");
      return res.status(401).json({ message: "Invalid token format." });
    }

    const token = parts[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
      return res.status(500).json({ message: "Server configuration error. No secret defined." });
    }

    const { payload, error } = verifyToken(token, secret);

    if (error === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please refresh your token." });
    }

    if (error === "InvalidTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }

    if (payload) {
      (req as any).userId = payload.userId;
      next();
    } else {
      return res.status(400).json({ message: "Invalid or expired access token." });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(400).json({ message: "Invalid or expired access token." });
  }
};

export default authMiddleware;
