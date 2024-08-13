export interface SuccessResponse{
    msg:string,
    accessToken:string;
    signup?:boolean,
    loginMail?:boolean,
    loginSuccess?:boolean
    expiresIn:string;
}

export interface ErrorResponse{
    msg:String;
    error?: unknown;
    otpVerified?:boolean;
    errors?:any[];
}