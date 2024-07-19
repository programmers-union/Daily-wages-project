import {Router} from 'express';
import {validateClientSignup} from '../middlewares/validationMiddleware';
import { signupClient,resendOtp,verifyOtp,loginClient,loginMailCheck,forgotPassword,changePassword } from '../controllers/clientController';
const router=Router();


router.post('/signup',validateClientSignup,signupClient);
router.patch('/verifyOtp',verifyOtp);
router.post('/resendOtp',resendOtp);
router.get('/loginMailCheck',loginMailCheck);
router.post('/login',loginClient);
router.get('/forgot-password',forgotPassword);
router.patch('/changePassword',changePassword);


export default router;