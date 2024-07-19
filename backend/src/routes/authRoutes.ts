import {Router} from 'express';
import passport from 'passport';
import { googleAuthCallback,getCurrentUser } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
const authRouter=Router();



authRouter.get('/google',passport.authenticate('google',{scope:['profile','email']}));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuthCallback);
authRouter.get('/me', authMiddleware, getCurrentUser);

export default authRouter;