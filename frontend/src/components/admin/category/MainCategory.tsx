import React from "react";
import CategoryListTable from "./CategoryListTable";
import { MainCategoryProps } from "../../../types/AdminGategoryType";

const MainCategory: React.FC<MainCategoryProps> = ({ setActiveAddCategoryPopup }) => {
  const Category = ["Basic Services", "Skilled Services", "Professional Services", "Producer Services"];
  
  return (
    <div className="">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 flex flex-col overflow-hidden text-sm">
        <div className="sticky top-0 bg-white dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 z-10">
          <div className="sm:px-7  px-4  flex flex-col w-full">
            <div className="flex items-center space-x-3 sm:mt-7 mt-4">
              {Category.map((item, index) =>
                <h6 key={index} className="px-3 border-b-2 cursor-pointer border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5">{item}</h6>
              )}
            </div>
          </div>
        </div>
        <CategoryListTable setActiveAddCategoryPopup={setActiveAddCategoryPopup} />
      </div>
    </div>
  );
};

export default MainCategory;
