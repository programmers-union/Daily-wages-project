import { Router } from "express";
import {
  signupEmployee,
  // resendOtpEmployee,
  // employeeForgotPassword,
  // employeeChangePassword,
  verifyOtpEmployee,
} from "../controllers/employeeController";
import { validateEmployerSignup } from "../middlewares/validationMiddleware";
const employeeRouter = Router();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

employeeRouter.post("/worker-signUp", validateEmployerSignup, signupEmployee);
employeeRouter.patch("/verify-otp", verifyOtpEmployee);



export default employeeRouter;
