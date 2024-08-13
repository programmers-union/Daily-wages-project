import { Router } from "express";
import { validateClientSignup } from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import {
  signupClient,
  resendOtpClient,
  verifyOtpClient,
  loginClient,
  loginMailCheck,
  clientForgotPassword,
  clientChangePassword,
  refreshToken,
  handleJobRequest,
  getjobDataForCalender,
  editCalenderData,
  deleteCalenderData,
} from "../controllers/clientController";
const router = Router();

router.post("/signup", validateClientSignup, signupClient);
router.patch("/verify-otp", verifyOtpClient);
router.post("/resend-otp", resendOtpClient);
router.get("/login-mail-check", loginMailCheck);
router.post("/login", loginClient);
router.get("/forgot-password", clientForgotPassword);
router.patch("/change-password", clientChangePassword);
router.post("/refresh-token", refreshToken);
router.post("/client-job-request", authMiddleware, handleJobRequest);
router.get("/calender-show-data", authMiddleware, getjobDataForCalender);
router.put("/edit-calender-data", authMiddleware, editCalenderData);
router.delete("/delete-calender-data", authMiddleware, deleteCalenderData);

export default router;