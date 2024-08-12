import React, { createContext, FC, ReactNode, useMemo } from "react";
import { ClientAddFormData, ClientForm } from "../../types/ClientFormType";
import axios from "axios";
import { axiosInterceptorPage } from "./Interceptor";

interface ClientProviderProps {
  children: ReactNode;
}

const ClientContext = createContext<ClientForm | null>(null);

export const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  const axiosInstance = useMemo(() => axiosInterceptorPage(), []);

  const ClientCalendarAddForm = async (formData: ClientAddFormData) => {
    try {
      const response = await axiosInstance.post(
        "/api/client/client-job-request",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Job request added", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error adding job request:",
          error.response?.data?.message
        );
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
