export interface SuccessResponse{
    msg:string,
    accesstoken:string;
    signup?:boolean,
    loginMail?:boolean,
    loginSuccess?:boolean
    expiresin:string;
    isCheck:boolean;
}

export interface ErrorResponse{
    msg:String;
    error?: unknown;
    otpVerified?:boolean;
    errors?:any[];
}