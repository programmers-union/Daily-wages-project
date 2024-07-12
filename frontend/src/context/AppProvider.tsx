import  { FC } from 'react';
import { AuthProvider } from './modules/AuthContext';
import { OtpProvider } from './modules/OtpContext';
import { ChildrenNode } from '../types/authTypes/AuthTypes';

const AppProvider: FC<ChildrenNode> = ({ children }) => {
  return (
    <AuthProvider>
      <OtpProvider>
        {children}
      </OtpProvider>
    </AuthProvider>
  );
};

export default AppProvider;
