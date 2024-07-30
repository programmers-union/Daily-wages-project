import axios from "axios";
import React, { createContext, useState, FC } from "react";
import { ChildrenNode } from "../../types/authTypes/AuthTypes";
import { AdminFormData, AdminFormListData, GetSubCategoryAndItems, Item } from "../../types/AdminGategoryType";

const AdminFormContext = createContext<AdminFormListData | null>(null);

export const AdminContext: FC<ChildrenNode> = ({ children }) => {
  const [mainCategoryId, setMainCategoryId] = useState<string>('');
  const [subCategoryId, setSubCategoryId] = useState<string>('');
  const [getSubCategoriesdata, setGetSubCategories] = useState<GetSubCategoryAndItems>([]);
  const [getSubCategoriesItemsDatas, setGetSubCategoriesItemsDatas] = useState<Item[]>([]); // Changed to Item[]

  const AdminFormAdding = async (formDataAdmin: AdminFormData) => {
    console.log(formDataAdmin, 'adding form data ....')
    try {
      const response = await axios.post('http://localhost:5000/api/admin/add-sub-category-items', formDataAdmin,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
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
    <AdminFormContext.Provider value={{
      AdminFormAdding, setMainCategoryId, mainCategoryId, setSubCategoryId, subCategoryId,
      setGetSubCategories, getSubCategoriesdata, getSubCategoriesItemsDatas, setGetSubCategoriesItemsDatas
    }}>
      {children}
    </AdminFormContext.Provider>
  );
};

export default AdminFormContext;
