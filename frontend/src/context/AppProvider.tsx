import React, { FC } from 'react';
import { AuthProvider } from './modules/AuthContext';
import { OtpProvider } from './modules/OtpContext';
import { ChildrenNode } from '../types/authTypes/AuthTypes';
import { WorkerFormProvider } from './modules/WorkerFormData';
import { AdminContext } from './modules/AdminFormContext';

const AppProvider: FC<ChildrenNode> = ({ children }) => {
  return (
    <AuthProvider>
      <OtpProvider>
        <AdminContext>
          <WorkerFormProvider>{children}</WorkerFormProvider>
        </AdminContext>
      </OtpProvider>
    </AuthProvider>
  );
};

export default AppProvider;
