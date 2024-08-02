import React, { createContext, FC } from 'react';

import { ChildrenNode } from '../../types/authTypes/AuthTypes';
import { ClientAddFormData, ClientForm } from '../../types/ClientFormType';
import axiosInstance from './Interceptor';
import axios from 'axios';

const ClientContext = createContext<ClientForm | null>(null);

export const ClientProvider: FC<ChildrenNode> = ({ children }) => {

  const ClientCalendarAddForm = async (formData: ClientAddFormData) => {
    try {
      const response = await axiosInstance.post('/api/client/client-job-request', formData);
      console.log('Job request added', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding job request:", error.response?.data?.message);
        throw error.response?.data?.message || "Error adding job request";
      } else {
        console.error("An unexpected error occurred:", error);
        throw "An unexpected error occurred";
      }
    }
  };

  return (
    <ClientContext.Provider value={{ ClientCalendarAddForm }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
