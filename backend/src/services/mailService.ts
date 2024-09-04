import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendOtpViaEmail = async (email: string, otp: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || "587"),
            secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code for resetting your password is ${otp}. It is valid for the next 10 minutes.`,
        };

        // Verify the transporter connection
        await transporter.verify();
        console.log('Transporter verified successfully');

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('----Error sending email:----', error);
        throw error;
    }
};
