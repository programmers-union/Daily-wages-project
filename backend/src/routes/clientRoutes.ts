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
  checkToken,
  handleJobRequest,
} from "../controllers/clientController";
const router = Router();

router.post("/signup", validateClientSignup, signupClient);
router.patch("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOtp);
router.get("/loginMailCheck", loginMailCheck);
router.post("/login", loginClient);
router.get("/forgot-password", forgotPassword);
router.patch("/changePassword", changePassword);
router.post("/refreshToken", refreshToken);
router.post("/checkToken", authMiddleware, checkToken);
router.post("/client-job-request", authMiddleware, handleJobRequest);

export default router;
