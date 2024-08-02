import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AdminFormListData,
  MainCategoryTableProps,
} from "../../../types/AdminGategoryType";
import AdminFormContext from "../../../context/modules/AdminFormContext";

const TableFilter: React.FC<MainCategoryTableProps> = ({
  setActiveAddCategoryPopup, paginate ,currentPage 
}) => {
  const [filterHandle, setFilterHandle] = useState<boolean>(false);
  const [getSubCategories, setGetSubCategories] = useState<string[]>([]);
  const [filterClickSubCategory, setFilterClickSubCategory] =
    useState<string>("All");
  const filterRef = useRef<HTMLDivElement>(null);

  const { mainCategoryId, getSubCategoriesdata  } = useContext(
    AdminFormContext
  ) as AdminFormListData;


  useEffect(() => {
    if (mainCategoryId && getSubCategoriesdata.length > 0) {
      const key = mainCategoryId;
      const items =
        getSubCategoriesdata[0][key]?.map(
          (item: { name: string }) => item.name
        ) || [];
      setGetSubCategories(items);
    }
  }, [mainCategoryId, getSubCategoriesdata]);

  const filterClickHandle = (item: string) => {
    setFilterClickSubCategory(item);
    setFilterHandle(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterHandle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex w-full gap-4 justify-between items-center mb-7">
        <div className="flex gap-4 relative items-center">
          <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
            <svg
              viewBox="0 0 24 24"
              className="w-4 mr-2 text-gray-400 dark:text-gray-600"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Last 30 days
            <svg
              viewBox="0 0 24 24"
              className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {/* <div className="absolute top-10 left-4">
 <div>

 </div>
          </div> */}
          <button
            onClick={() => setFilterHandle(true)}
            className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0"
          >
            Filter by
            <svg
              viewBox="0 0 24 24"
              className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {filterHandle && (
            <div ref={filterRef} className="absolute top-9 left-[164px] z-40">
              <div className="border border-gray-400 rounded-md py-2 px-4 h-40 overflow-y-scroll bg-white text-xs flex flex-col gap-2">
                <div
                  onClick={() => filterClickHandle("All")}
                  className="flex items-center gap-2"
                >
                  <input
                    type="radio"
                    name="subcategory"
                    checked={filterClickSubCategory === "All"}
                    id={`subCategory-All`}
                  />
                  <label className="cursor-pointer" htmlFor={`subCategory-All`}>
                    All
                  </label>
                </div>
                {getSubCategories.map((item, index) => (
                  <div
                    onClick={() => filterClickHandle(item)}
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="subcategory"
                      checked={filterClickSubCategory === item}
                      id={`subCategory-${index}`}
                    />
                    <label
                      className="cursor-pointer"
                      htmlFor={`subCategory-${index}`}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => setActiveAddCategoryPopup(true)}
            className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow bg-blue-700 text-white hover:bg-blue-500 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0"
          >
            Add Category
          </button>
        </div>
        <div className="">
          <button className="inline-flex hover:bg-gray-200 mr-3 items-center h-8 pl-2.5 pr-3 rounded-md shadow dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
            {filterClickSubCategory}
          </button>
          <div className="ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center">
            <span className="mr-3"> 2/ 4</span>
            <button onClick={() => paginate(currentPage - 1)} className="inline-flex mr-2 items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
              <svg
                className="w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button onClick={() => paginate(currentPage + 1)} className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
              <svg
                className="w-4"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFilter;
