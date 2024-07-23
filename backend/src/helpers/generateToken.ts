import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (userId: any): any => {
    const payload = { userId };
     
    
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    console.log("accessTokenSecret:",accessTokenSecret);
    if (!accessTokenSecret) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }

    const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '1h' });
    return { accessToken,expiresIn:'1h'}
}

export const generateRefreshToken = (userId: string): string => {
    const payload = { userId };
          
    // Ensure REFRESH_TOKEN_SECRET is defined
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    console.log("refreshTokenSecret:",refreshTokenSecret);
    
    if (!refreshTokenSecret) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }

    return jwt.sign(payload, refreshTokenSecret, { expiresIn: '5d' });
};

export const verifyToken = (token: string, secret: string): JwtPayload | null => {
    try {
        console.log("Flow reached verifyToken function");
        console.log('Token:', token);
        console.log('Secret used for verification:', secret);

        const decoded = jwt.verify(token, secret) as JwtPayload;
        console.log('Token verified successfully:', decoded);
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null; 
    }
};