export interface AdminFormData {
  image: File | null;
  subCategory: string;
  jobTitle: string;
  newSubCategory: string;
  description: string;
  subCategoryId: string;
}

export interface FormProgressProps {
  activeAddCategoryPopup: boolean;
  nextStep: () => void;
  prevStep: () => void;
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
}

export interface MainCategoryProps {
  setActiveAddCategoryPopup: (active: boolean) => void;
}

export interface MainCategoryTableProps {
  setActiveAddCategoryPopup: (active: boolean) => void;
  paginate: (page: number) => void;
  currentPage: number;
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
