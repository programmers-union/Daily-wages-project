import {Router} from 'express';
import {validateSignup} from '../middlewares/validationMiddleware';
import { signupClient,resendOtp,verifyOtp,loginClient, loginMailCheck } from '../controllers/clientController';
const router=Router();

router.post('/signup',validateSignup,signupClient);
router.post('/resendOtp',resendOtp);
router.post('/verifyOtp',verifyOtp);
router.post('/loginMailCheck',loginMailCheck);
router.post('/login',loginClient);


export default router;