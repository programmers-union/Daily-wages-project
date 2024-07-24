import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/generateToken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access denied. No token provided.');

    const token = authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        return res.status(500).send('Server configuration error. No secret defined.');
    }

    const payload = verifyToken(token, secret);
    if (payload) {
        req.user = payload; // Attach payload to request if needed
        next();
    } else {
        res.status(400).send('Invalid or expired access token.');
    }
};

export default authMiddleware;