import { SignupClientRequestBody, VerifyOtpRequestBody,ResendOtpRequestBody } from "client/requests";

export interface SignupEmployeeRequestBody  {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    password: string;
    phoneNumber: string;
    gender: string;
    address: string;
    selectState: string;
    selectDistrict: string;
    selectCity: string;
    pinCode: string;
    skills: string;
    qualification: string;
    experience: string;
    skillLevel: string;
    holderName: string;
    accoutNumber: string;
    bank: string;
    ifsc: string;
    branch: string;
    linkPhoneNumber: string;
    idProof: string;
    uniqueId: string;
  }

export interface VerifyOtpEmployeeRequestBody extends VerifyOtpRequestBody{
    email:string;
}
export interface ResendOtpEmployeeRequestBody extends ResendOtpRequestBody{
    
}