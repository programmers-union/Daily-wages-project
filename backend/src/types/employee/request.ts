import { SignupClientRequestBody, VerifyOtpRequestBody,ResendOtpRequestBody } from "client/requests";

export interface SignupEmployeeRequestBody extends SignupClientRequestBody{
    dob:string;
    gender:string;
    address:string;
    state:string;
    district:string;
    city:string;
    pinCode:string;
    skills:string;
    qualification:string;
    experience:string;
    skillLevel:string;
    holderName:string;
    accountNumber:string;
    bank:string;
    ifsc:string;
    branch:string;
    linkedPhoneNumber:string;
    idProof:string;
    uniqueId:string,
    idProofFile:string

}

export interface VerifyOtpEmployeeRequestBody extends VerifyOtpRequestBody{
    email:string;
}
export interface ResendOtpEmployeeRequestBody extends ResendOtpRequestBody{
    
}