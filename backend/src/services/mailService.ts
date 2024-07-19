import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


export const sendOtpViaEmail=async(email:string,otp:string)=>{
    const transporter=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:parseInt(process.env.EMAIL_PORT ||  "587"),
        secure:true,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Your OTP Code",
        text:`Your OTP code for Resetting password is ${otp}`
    };

    await transporter.sendMail(mailOptions);
}