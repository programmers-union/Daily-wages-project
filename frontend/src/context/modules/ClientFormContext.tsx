import React, { createContext, FC, ReactNode } from "react";
import { ClientAddFormData } from "../../types/ClientFormType";
import axios from "axios";
import { axiosInterceptorPage } from "./Interceptor";

// Define the interface for the context value
interface ClientContextType {
  ClientCalendarAddForm: (formData: ClientAddFormData) => Promise<void>;
}

interface ClientProviderProps {
  children: ReactNode;
}

// Initialize context with a default value or null
const ClientContext = createContext<ClientContextType | null>(null);

export const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  const ClientCalendarAddForm = async (formData: ClientAddFormData) => {
    const axiosInstance = axiosInterceptorPage();
  console.log(formData,'formdata,...')
    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/api/client/client-job-request",
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
        throw new Error(error.response?.data?.message || "Error adding job request");
      } else {
        console.error("An unexpected error occurred:", error);
        throw new Error("An unexpected error occurred");
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
