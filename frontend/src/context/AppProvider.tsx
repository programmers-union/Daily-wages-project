import React from 'react'
import { AuthProvider } from './modules/AuthContext';
import { OtpProvider } from './modules/OtpContext';
import { ChildrenNode } from '../types/authTypes/AuthTypes';
import { WorkerFormProvider } from './modules/WorkerFormData';
import { AdminContext } from './modules/AdminFormContext';
import { ClientProvider } from './modules/ClientFormContext';

const AppProvider: React.FC<ChildrenNode> = ({ children }) => {
  return (
    <AuthProvider>
      <OtpProvider>
        <AdminContext>
          <ClientProvider>
          <WorkerFormProvider>{children}</WorkerFormProvider>
          </ClientProvider>
        </AdminContext>
      </OtpProvider>
    </AuthProvider>
  );
};

export default AppProvider;
