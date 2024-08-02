import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/generateToken';
import Client from '../models/Client';
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

    try {
        const payload = verifyToken(token, secret);
        if (payload && typeof payload !== 'string') {
            // Assume payload can be safely cast to User type
            req.user = payload as typeof Client;
            next();
        } else {
            res.status(401).send('Invalid or expired access token.');
        }
    } catch (error) {
        return res.status(401).send('Invalid or expired access token.');
    }
};

export default authMiddleware;