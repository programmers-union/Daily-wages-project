import React, { useContext, useEffect, useState } from "react";
import CategoryListTable from "./CategoryListTable";
import SkillCategoryTable from "./SkillCategoryTable";
import { AdminFormListData, CategoryItem, MainCategoryProps } from "../../../types/AdminGategoryType";
import axios from "axios";
import AdminFormContext from "../../../context/modules/AdminFormContext";

const MainCategory: React.FC<MainCategoryProps> = ({ setActiveAddCategoryPopup }) => {
  const [clickToChange, setClickToChange] = useState<number|string>(0); 
  const [mainCategory, setMainCategory] = useState<CategoryItem[]>([]);

  const { setMainCategoryId} = useContext(AdminFormContext) as AdminFormListData;
  
  useEffect(() => {
    const GetMainCategory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/get-main-categories');
        const categories = response.data.categories;
        setMainCategory(categories);

        // Set default category ID
        if (categories.length > 0) {
          setMainCategoryId(categories[0]._id);
        }

        console.log('Categories fetched', response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching categories:", error.response?.data?.message);
          throw error.response?.data?.message || "Error fetching categories";
        } else {
          console.error("An unexpected error occurred:", error);
          throw "An unexpected error occurred";
        }
      }
    };
    GetMainCategory();
  }, [setMainCategoryId]);

  const renderComponent = () => {
    switch (clickToChange) {
      case 1:
        return <SkillCategoryTable setActiveAddCategoryPopup={setActiveAddCategoryPopup}  />;
      case 2:
      case 3:
      case 0:
      default:
        return <CategoryListTable setActiveAddCategoryPopup={setActiveAddCategoryPopup} />;
    }
  };

  const mainClickHandle = (id: string, index: number) => {
    setClickToChange(index);
    setMainCategoryId(id);
  }

  return (
    <div className="">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 flex flex-col overflow-hidden text-sm">
        <div className="sticky top-0 bg-white dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 z-10">
          <div className="sm:px-7 px-4 flex flex-col w-full">
            <div className="flex items-center space-x-3 sm:mt-7 mt-4">
              {mainCategory.map((item, index) => (
                <button
                  onClick={() => mainClickHandle(item._id, index)}
                  key={item._id}
                  className={`px-3 border-b-2 cursor-pointer ${
                    clickToChange === index
                      ? "border-blue-500 text-blue-500 dark:text-white dark:border-white"
                      : "border-transparent"
                  } pb-1.5`}
                >
                  {item.categoryName}
                </button>
              ))}
            </div>
          </div>
        </div>
        {renderComponent()}
      </div>
    </div>
  );
};

export default MainCategory;
