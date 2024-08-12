import { Router } from "express";
import { validateClientSignup } from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import {
  signupClient,
  resendOtp,
  verifyOtp,
  loginClient,
  loginMailCheck,
  forgotPassword,
  changePassword,
  refreshToken,
  handleJobRequest,
  getjobDataForCalender,
} from "../controllers/clientController";

const router = Router();

router.post("/signup", validateClientSignup, signupClient);
router.patch("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOtp);
router.get("/loginMailCheck", loginMailCheck);
router.post("/login", loginClient);
router.get("/forgot-password", forgotPassword);
router.patch("/changePassword", changePassword);
router.post("/refresh-token", refreshToken);
router.post("/client-job-request", authMiddleware, handleJobRequest);
router.get('/calender-show-data',authMiddleware,getjobDataForCalender);

export default router;
