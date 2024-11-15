import axios from "axios";
import React , { createContext, useState, useEffect } from "react";
import { ChildrenNode } from "../../types/authTypes/AuthTypes";
import { AdminFormData, AdminFormListData, EmployeeData, GetSubCategoryAndItems, Item } from "../../types/AdminGategoryType";

const AdminFormContext = createContext<AdminFormListData | null>(null);

export const AdminContext: React.FC<ChildrenNode> = ({ children }) => {
  const [mainCategoryId, setMainCategoryId] = useState<string>('');
  const [subCategoryId, setSubCategoryId] = useState<string>('');
  const [getSubCategoriesdata, setGetSubCategories] = useState<GetSubCategoryAndItems>([]);
  const [getSubCategoriesItemsDatas, setGetSubCategoriesItemsDatas] = useState<Item[]>([]); 
  const [ getEmployeeFullData , setGetEmployeeFullData] = useState<EmployeeData[]>([]);
  const [ passingCategoriesDataAllPage,setPassingCategoriesDataAllPage] = useState<string[]>([])

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
  useEffect(()=>{
    const GetEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/get-employee-data');
        setGetEmployeeFullData(response.data)
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
    GetEmployeeData()
  },[setGetEmployeeFullData])

  useEffect(()=>{
    const getAllCategoryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/get-sub-category-items');
        setPassingCategoriesDataAllPage(response.data)
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
    getAllCategoryData()
  },[setPassingCategoriesDataAllPage])
  // const GetEmployeeData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/admin/get-employee-data');
  //     console.log('Category added #############################33', response.data);
  //     setGetEmployeeFullData(response.data)
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error("Error adding category:", error.response?.data?.message);
  //       throw error.response?.data?.message || "Error adding category";
  //     } else {
  //       console.error("An unexpected error occurred:", error);
  //       throw "An unexpected error occurred";
  //     }
  //   }
  // };

  return (
    <AdminFormContext.Provider value={{
      AdminFormAdding, setMainCategoryId, mainCategoryId, setSubCategoryId, subCategoryId, getEmployeeFullData,
      setGetSubCategories, getSubCategoriesdata, getSubCategoriesItemsDatas, setGetSubCategoriesItemsDatas ,passingCategoriesDataAllPage
    }}>
      {children}
    </AdminFormContext.Provider>
  );
};

export default AdminFormContext;
