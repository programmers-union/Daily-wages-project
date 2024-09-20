import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid=process.env.ACCOUNT_SID;
const authToken=process.env.TWILIO_TOKEN;

const client=twilio(accountSid,authToken);


export const sendOtp=async(mobileNumber:string,otp:string):Promise<void>=>{
    try {
        console.log("mobileNumber:",mobileNumber);
        console.log("otp:",otp);
        await client.messages.create({
            body:`Your OTP is ${otp}`,
            to:mobileNumber,
            from:process.env.TWILIO_NUMBER
        })

    } catch (error) {
        console.error('Error sending OTP:',error);
        throw new Error('Failed to send OTP');
    }
};







