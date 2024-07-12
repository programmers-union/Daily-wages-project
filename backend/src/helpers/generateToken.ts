import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId: string): string => {
    const payload={userId};
    return jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '1h' });
};
