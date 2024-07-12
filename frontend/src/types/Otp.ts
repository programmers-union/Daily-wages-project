import { ReactNode } from "react";

export interface OtpContextType {
  OTPSubmit: (otp: OtpAndSignupType) => Promise<void>;
  OTPReset: (otp: OtpAndSignupType) => Promise<void>;
}
export interface ChildrenNode {
  children: ReactNode;
}
export type OtpAndSignupType = {
  otp: string;
  signup: string | null;
};
