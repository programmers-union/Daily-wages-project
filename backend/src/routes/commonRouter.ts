import { Router } from "express";
import { clientChangePassword, clientForgotPassword, clientLogout, loginClient, profile, refreshToken, resendOtp } from "../controllers/commonController";
import { loginMailCheck } from "../controllers/commonController";
import authMiddleware from "../middlewares/authMiddleware";

const commonRouter = Router();

commonRouter.get("/login-mail-check", loginMailCheck);
commonRouter.post("/login", loginClient);
commonRouter.get("/forgot-password", clientForgotPassword);
commonRouter.patch("/change-password", clientChangePassword);
commonRouter.post("/resend-otp", resendOtp);
commonRouter.post("/logout",authMiddleware, clientLogout);
commonRouter.get("/profile", authMiddleware, profile);
commonRouter.post("/refresh-token", refreshToken);

export default commonRouter;