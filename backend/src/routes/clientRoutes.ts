import { Router } from "express";
import { validateClientSignup } from "../middlewares/validationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import {
  signupClient,
  verifyOtpClient,
  handleJobRequest,
  getjobDataForCalender,
  editCalenderData,
  deleteCalenderData,

} from "../controllers/clientController";
const router = Router();

router.post("/signup", validateClientSignup, signupClient);
router.patch("/verify-otp", verifyOtpClient);
router.post("/client-job-request", authMiddleware, handleJobRequest);
router.get("/calender-show-data", authMiddleware, getjobDataForCalender);
router.put("/edit-calender-data", authMiddleware, editCalenderData);
router.delete("/delete-calender-data", authMiddleware, deleteCalenderData);



export default router;