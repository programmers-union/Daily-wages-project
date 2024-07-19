export interface SuccessResponse{
    msg:string,
    signup?:boolean,
    loginMail?:boolean,
    loginSuccess?:true

}

export interface ErrorResponse{
    msg:String;
    error?: unknown;
    otpVerified?:boolean;
    errors?:any[];
}