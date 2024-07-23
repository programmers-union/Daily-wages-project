import { ReactNode } from "react";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export type EmailPasswordData = Pick<FormData, 'email' | 'password'>;
export type EmailData = Pick<FormData, 'email'>;

export interface AuthContextProps {
  SignUp: (formData: FormData) => Promise<void>,
  EmailLogin: (loginData: EmailData) => Promise<void>;
  Login: (loginData: EmailPasswordData) => Promise<void>;
  signupForm: FormData | null ;
  loginEmailTrue: string | boolean | undefined ;
  singleEmail:string
}

export interface ChildrenNode {
  children: ReactNode;
}
export interface AuthErrorType {
  message: string;
  type: 'email' | 'password' | 'general';
}
