import { ReactNode } from "react";

export interface OtpContextType {
  OTPSubmit: (otp: OtpAndSignupType) => Promise<void>;
  OTPReset: (otp: OtpAndSignupType) => Promise<void>;
  ForgotPassword: (forgotPassword: string) => Promise<void>;
  ForgotPasswordOtp: (forgotPasswordOtp: OtpAndSignupType) => Promise<void>;
  // ForgotOTPSubmit: (otp: OtpAndSignupType) => Promise<void>;
  setForgotCheckBox: (forgotCheckBox: number) => void;
  setIsChangePassword:(item: boolean) => void;
  ChangePassword: (changePass: OtpAndSignupType) => void;
  setIsCheckClientOrWorker:(item: boolean) => void;
  isCheckClientOrWorker:boolean
}

export interface ChildrenNode {
  children: ReactNode;
}

export type OtpAndSignupType = {
  otp: string;
  signup: string | null ;
  forgotPasswordOtp?: string;
  changePass?: string | null;
  singleEmail?: string | null; 
  email?: string;
};


export interface ForgotPasswordType {
  ForgotPassword: (forgotPassword: string) => Promise<void>;
}
