import jwt, { JwtPayload , TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (userId: any): any => {
    const payload = { userId };
     
    
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    console.log("accessTokenSecret:",accessTokenSecret);
    if (!accessTokenSecret) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }

    const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '5m' });
    return { accessToken}
}

export const generateRefreshToken = (userId: string): string => {
    const payload = { userId };
    console.log(payload,'user id is user id')
          
    // Ensure REFRESH_TOKEN_SECRET is defined
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    console.log("refreshTokenSecret:",refreshTokenSecret);
    
    if (!refreshTokenSecret) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }

    return jwt.sign(payload, refreshTokenSecret, { expiresIn: '5d' });
};

interface VerifyTokenResult {
    payload: JwtPayload | null;
    error: string | null;
  }

export const verifyToken = (token: string, secret: string): VerifyTokenResult => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return { payload: decoded, error: null };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.error("Token verification failed: Token expired at.....", error.expiredAt);
      return { payload: null, error: "TokenExpiredError" };
    }
    console.error("Token verification failed:", error);
    return { payload: null, error: "InvalidTokenError" };
  }
};


export const getUserIdFromToken = (token: string): string | null => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }
    
    const payload = verifyToken(token, secret);
    
    if (payload && typeof payload === 'object' && 'userId' in payload) {
        return payload.userId as string;
    }
    
    return null;
};

