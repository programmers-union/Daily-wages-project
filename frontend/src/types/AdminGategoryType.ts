import { Dispatch, SetStateAction } from "react";

export interface AdminFormData {
  image: File | null;
  subCategory: string;
  jobTitle: string;
  newSubCategory: string;
  description: string;
  subCategoryId: string  ;
}

export interface FormProgressProps {
  activeAddCategoryPopup: boolean;
  nextStep: () => void;
  prevStep: () => void;
  setActiveAddCategoryPopup: Dispatch<SetStateAction<boolean>>;
}
export interface Item {
  id: string;
  name: string;
  // other properties...
}
export interface EmployeeData {
  _id: string;
  holderName: string;
  profilePic: string;
  city: string;
  rating: number;
  experience: number;
  skillLevel: string;
  totalWork?: number;
  completedWork?: number;
  workStatus: string;
  linkedPhoneNumber: string;
  email: string;
  bankAccountDetails: string;
}

export interface Category {
  subCategoryItems: string[];
}
export interface AdminFormListData {
  AdminFormAdding: (formDataAdmin: AdminFormData) => Promise<void>;
  setMainCategoryId: (id: string) => void;
  setSubCategoryId: (id: string) => void;
  subCategoryId: string;
  mainCategoryId: string;
  getSubCategoriesdata: GetSubCategoryAndItems;
  setGetSubCategories: (values: GetSubCategoryAndItems) => void;
  getSubCategoriesItemsDatas: Item[];
  setGetSubCategoriesItemsDatas: (values: Item[]) => void;
  getEmployeeFullData:EmployeeData[] 
  passingCategoriesDataAllPage: Category | string[];
}
export interface MainCategoryProps {
  setActiveAddCategoryPopup: (active: boolean) => void;
}

export interface MainCategoryTableProps {
  setActiveAddCategoryPopup: (active: boolean) => void;
  setPaginate: ((page: number) => void);
  currentPage: number ;
}

export interface CategoryItem {
  _id: string;
  categoryName: string;
  __v: number;
}

export interface Item {
  _id: string;
  name: string;
  subCategoryId?: {
    name: string;
  };
  jobTitle?: string;
  date?: string;
}

interface SubCategory {
  [key: string]: Item[];
}

export type GetSubCategoryAndItems = SubCategory[];
