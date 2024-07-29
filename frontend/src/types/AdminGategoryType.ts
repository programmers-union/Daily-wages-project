export interface AdminFormData {
  image: File | null;
  category: string;
  subcategory: string;
  jobTitle: string;
  newSubCategory:string
  description: string;
  date: string;
}

export interface FormProgressProps {
  activeAddCategoryPopup: boolean;
  nextStep: () => void;
  prevStep: () => void;
}

export interface AdminFormListData {
  AdminFormAdding: (formDataAdmin: AdminFormData) => Promise<void>;
  setMainCategoryId: (id: string ) => void;
  mainCategoryId: string;
  getSubCategoryAndItems:string[];
  setGetSubCategoryAndItems:(values:string[]) => void;
}

export interface MainCategoryProps {
  setActiveAddCategoryPopup: (active: boolean) => void;
}

export interface CategoryItem {
  _id: string;
  categoryName: string;
  __v: number;
}
