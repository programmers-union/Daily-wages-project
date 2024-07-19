import axios from "axios";
import React, { createContext } from "react";
import { ChildrenNode } from "../../types/authTypes/AuthTypes";
import { AdminFormData, AdminFormListData } from "../../types/AdminGategoryType";

const AdminFormContext = createContext<AdminFormListData | null>(null);

export const AdminContext = ({ children }: ChildrenNode) => {

  const AdminFormAdding = async (formDataAdmin: AdminFormData) => {
    console.log(formDataAdmin, 'admin****');
    try {
      const response = await axios.post('http://localhost:5000/api/admin/add-category', formDataAdmin);
      console.log('Category added', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding category:", error.response?.data?.message);
        throw error.response?.data?.message || "Error adding category";
      } else {
        console.error("An unexpected error occurred:", error);
        throw "An unexpected error occurred";
      }
    }
  };

  return (
    <AdminFormContext.Provider value={{ AdminFormAdding }}>
      {children}
    </AdminFormContext.Provider>
  );
};

export default AdminFormContext;
