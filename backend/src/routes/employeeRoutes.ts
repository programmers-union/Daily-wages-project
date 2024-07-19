import {Router} from 'express';
import {signupEmployee,verifyOtp,resendOtp,loginMailCheck,loginEmployee} from "../controllers/employeeController"
import { validateEmployerSignup } from '../middlewares/validationMiddleware';
const employeeRouter=Router();
import multer from 'multer';
const storage=multer.memoryStorage();
const upload=multer({storage:storage});


employeeRouter.post('/signup',validateEmployerSignup,upload.single('photo'),signupEmployee);
employeeRouter.patch('/verifyOtp',verifyOtp);
employeeRouter.post('/resendOtp',resendOtp);
employeeRouter.post('/loginMailCheck',loginMailCheck);
employeeRouter.post('/login',loginEmployee);
// employeeRouter.get('forgot-password',forgotPassword);




export default employeeRouter;


