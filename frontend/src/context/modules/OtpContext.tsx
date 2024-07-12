import React, { createContext, ReactNode } from 'react';
import axios from 'axios';
import { OtpAndSignupType, OtpContextType } from '../../types/Otp';

const OtpContext = createContext<OtpContextType | undefined>(undefined);

const OtpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const OTPSubmit = async (otp: OtpAndSignupType) => {
    try {
      const response = await axios.post('http://localhost:5000/api/client/verifyOtp', { otp });
      console.log('otp submit started', response.data);
      
    } catch (error) {
      console.error('otp submit error', error);
    }
  };
  const OTPReset = async (otp: OtpAndSignupType) => {
    try {
      const response = await axios.post('http://localhost:5000/api/client/resendOtp', { otp });
      console.log('reset otp started', response.data);
    } catch (error) {
      console.error('reset otp failed', error);
    }
  };

  return (
    <OtpContext.Provider value={{ OTPSubmit , OTPReset }}>
      {children}
    </OtpContext.Provider>
  );
};

export { OtpContext, OtpProvider };
