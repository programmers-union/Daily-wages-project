import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendOtpViaEmail = async (email: string, otp: string) => {
  

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || "587"),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        
    });


    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code for Resetting password is ${otp}`
    };

    try {
        await transporter.verify(); 
        console.log('Transporter verified successfully');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}