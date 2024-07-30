import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AdminFormListData,
  Item,
  MainCategoryProps,
} from "../../../types/AdminGategoryType";
import TableFilter from "./TableFilter";
import AdminFormContext from "../../../context/modules/AdminFormContext";

const CategoryListTable: React.FC<MainCategoryProps> = ({
  setActiveAddCategoryPopup,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const TableHeadContent = ["No", "Name", "Category", "Date"];

  const filterRef = useRef<HTMLDivElement>(null);
  const { getSubCategoriesItemsDatas } = useContext(
    AdminFormContext
  ) as AdminFormListData;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getSubCategoriesItemsDatas.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(
    getSubCategoriesItemsDatas.length / itemsPerPage
  );

  return (
    <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="sm:p-7 p-4">
        <TableFilter
          setActiveAddCategoryPopup={setActiveAddCategoryPopup}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="custom-scrollbar-container overflow-x-auto border border-gray-100">
          <div className="inline-block min-w-full">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-200 sticky top-0 z-10">
                  <tr>
                    {TableHeadContent.map((item) => (
                      <th
                        key={item}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item, index) => (
                    <tr key={item._id || index}>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                        {index + 1 + indexOfFirstItem}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                        {item.jobTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                        {item?.subCategoryId?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === item._id ? null : item._id
                              )
                            }
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                          {activeDropdown === item._id && (
                            <div
                              ref={filterRef}
                              className="origin-top-right absolute right-0 w-28 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5"
                            >
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  role="menuitem"
                                >
                                  Delete
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  role="menuitem"
                                >
                                  Edit
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 flex w-full mt-5 space-x-2 justify-end bg-white dark:bg-gray-900 dark:border-gray-800 p-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none"
          >
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
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none ${
                currentPage === index + 1
                  ? "bg-gray-100 dark:bg-gray-800 dark:text-white"
                  : "text-gray-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none"
          >
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
  );
};

export default CategoryListTable;
