import { Router } from 'express';
import passport from 'passport';
import { facebookAuth, googleAuthCallback } from '../controllers/authController';

const authRouter = Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuthCallback);
authRouter.get('/facebook',facebookAuth);

export default authRouter;
