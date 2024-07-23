import React, { createContext, ReactNode, useState } from 'react';
import axios from 'axios';
import { OtpAndSignupType, OtpContextType } from '../../types/Otp';
import { useNavigate } from 'react-router-dom';

const OtpContext = createContext<OtpContextType | undefined>(undefined);

const OtpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [forgotCheckBox , setForgotCheckBox] =useState<string>('')
  const navigate = useNavigate();

  const OTPSubmit = async (otp: OtpAndSignupType) => {
    try {
      console.log(otp,'&&&')
      const response = await axios.patch('http://localhost:5000/api/client/verifyOtp', { otp });
      const isCheckedToHome =  response.data
      const storeInLocalStorage = isCheckedToHome.accessToken 
      console.log(storeInLocalStorage,'((')
      localStorage.setItem('accessToken',storeInLocalStorage)
      if(isCheckedToHome.otpVerified === true) {
        navigate('/home')
      }
    } catch (error) {
      console.error('OTP submit error', error);
    }
  };

  const OTPReset = async (otp: OtpAndSignupType) => {
    console.log(otp,'otp otp otp')
    try {
      const response = await axios.post('http://localhost:5000/api/client/resendOtp', { otp,forgotCheckBox });
      console.log('Reset OTP started', response.data);
      // Update state as needed
    } catch (error) {
      console.error('Reset OTP failed', error);
    }
  };

  const ForgotPassword = async (forgotPassword: string) => {
    if (forgotPassword.trim() !== '') {
      navigate('/otp');
    }
    try {
      const response = await axios.get('http://localhost:5000/api/client/forgot-password', {
        params: { forgotPassword },
      });
      console.log('Forgot password request started', response.data);
    } catch (error) {
      console.error('Forgot password request failed', error);
    }
  };

  const ForgotPasswordOtp = async (forgotPasswordOtp: OtpAndSignupType) => {
    try {
      const response = await axios.post('http://localhost:5000/api/client/forgot-password-otp', {
        forgotPasswordOtp,
      });
      console.log('Forgot password OTP request started', response.data);
    } catch (error) {
      console.error('Forgot password OTP request failed', error);
    }
  };

  // const ForgotOTPSubmit = async (otp: OtpAndSignupType) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/client/forgotVerifyOtp', { otp });
  //     console.log('OTP submit started', response.data);
  //     // Navigate or update state as needed
  //   } catch (error) {
  //     console.error('OTP submit error', error);
  //   }
  // };

  return (
    <OtpContext.Provider value={{ OTPSubmit, OTPReset, ForgotPassword, ForgotPasswordOtp , setForgotCheckBox }}>
      {children}
    </OtpContext.Provider>
  );
};

export { OtpContext, OtpProvider };
