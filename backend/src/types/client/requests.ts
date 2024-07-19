
export interface SignupClientRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }


  export interface ResendOtpRequestBody {
    signup: Pick<SignupClientRequestBody, 'email'>;
}

export interface VerifyOtpRequestBody {
  otp: string;
}

export type EmailRequestBody = Pick<SignupClientRequestBody, 'email'>;

export type LoginRequestBody=Pick<SignupClientRequestBody, 'email'|'password'>;
