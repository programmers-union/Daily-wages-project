import { useContext } from 'react';
import { OtpContext } from './OtpContext';

const UseOtp = () => {
  const context = useContext(OtpContext);
  if (context === undefined) {
    throw new Error('useOtp must be used within an OtpProvider');
  }
  return context;
};

export { UseOtp };
