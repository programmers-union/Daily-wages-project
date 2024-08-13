import { Router } from "express";
import {
  signupEmployee,
  resendOtpEmployee,
  loginMailCheck,
  loginEmployee,
  employeeForgotPassword,
  employeeChangePassword,
  verifyOtpEmployee,
} from "../controllers/employeeController";
import { validateEmployerSignup } from "../middlewares/validationMiddleware";
const employeeRouter = Router();

employeeRouter.post("/signup", validateEmployerSignup, signupEmployee);
employeeRouter.patch("/verify-otp", verifyOtpEmployee);
employeeRouter.post("/resend-otp", resendOtpEmployee);
employeeRouter.get("/login-mail-check", loginMailCheck);
employeeRouter.post("/login", loginEmployee);
employeeRouter.get("/forgot-password", employeeForgotPassword);
employeeRouter.patch("/change-password", employeeChangePassword);

export default employeeRouter;