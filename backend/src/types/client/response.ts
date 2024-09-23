
export interface DBClient {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber: string | undefined;
  }
  
  export interface SuccessResponse {
    msg: string;
    accesstoken?: string; 
    signup?: boolean;
    loginMail?: boolean;
    loginSuccess?: boolean;
    expiresin?: string;
    isCheck?: boolean;
    email?: string;
    type?: boolean;
    newClient: DBClient; 
  }

export interface ErrorResponse{
    msg:String;
    error?: unknown;
    otpVerified?:boolean;
    errors?:any[];
}