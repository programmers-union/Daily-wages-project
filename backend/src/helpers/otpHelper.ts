import {sendOtp} from '../services/twilioService';


export const generateOtp = (): string => {

    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  


  export const sendOtpToUser=async(mobileNumber:string,otp:string)=>{
    await sendOtp(mobileNumber,otp);
  };