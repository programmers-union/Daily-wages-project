
export interface AdminFormData {
    image: File | null;
    category: string;
    subcategory: string;
    jobTitle:string;
    description:string;
}
export interface FormProgressProps {
    activeAddCategoryPopup: boolean;
    nextStep: () => void;
    prevStep: () => void;
}

export interface AdminFormListData {
    AdminFormAdding: (formDataAdmin: AdminFormData) => Promise<void>;
  }
export interface MainCategoryProps {
    setActiveAddCategoryPopup: (active: boolean) => void;
  }