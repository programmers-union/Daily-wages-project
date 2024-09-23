import mongoose, { Schema } from 'mongoose';
export interface SignupClientRequestBody {
    firstName: string;
    lastName: string;
    email: string ;
    password: string;
    phoneNumber: string;
  }


export interface ResendOtpRequestBody {
  otp: {
    otp: string;
    signup: Pick<SignupClientRequestBody, 'email'>;
    
  };
  forgotCheckBox:string;
}

export interface VerifyOtpRequestBody {
  otp: string;
}



export type EmailRequestBody = Pick<SignupClientRequestBody, 'email'>;

export type LoginRequestBody=Pick<SignupClientRequestBody, 'email'|'password'>;

