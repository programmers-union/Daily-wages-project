import React, { useContext, useEffect, useState, useRef } from "react";
import {
  AdminFormData,
  AdminFormListData,
  Item,
  MainCategoryProps,
} from "../../../types/AdminGategoryType";
import AdminFormContext from "../../../context/modules/AdminFormContext";

const AddNewCategory: React.FC<MainCategoryProps> = ({
  setActiveAddCategoryPopup,
}) => {
  const [getSubCategories, setGetSubCategories] = useState<
  {
    name: string;
    subId: {
        name: string;
    } | undefined;
}[]
  >([]);
  const [formData, setFormData] = useState<AdminFormData>({
    image: null,
    subCategory: "",
    newSubCategory: "",
    jobTitle: "",
    description: "",
    subCategoryId: "",
  });

  const { AdminFormAdding, mainCategoryId, getSubCategoriesdata } = useContext(
    AdminFormContext
  ) as AdminFormListData;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "image") {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        setFormData({
          ...formData,
          [name]: target.files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      mainCategoryId: mainCategoryId,
    };
    console.log(updatedFormData, "updated");
    try {
      AdminFormAdding(updatedFormData);
      setActiveAddCategoryPopup(false);
    } catch (error) {
      console.error(error, "error admin");
    }
  };

  useEffect(() => {
    const key = mainCategoryId;
    if (getSubCategoriesdata.length > 0 && getSubCategoriesdata[0][key]) {
      const items = getSubCategoriesdata[0][key].map((item: Item) => ({
        name: item.name,
        subId: item.subCategoryId,
      }));
      setGetSubCategories(items);
    }
  }, [mainCategoryId, getSubCategoriesdata]);

  console.log(getSubCategories, "getSubCategories####");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAddingNewSubcategory, setIsAddingNewSubcategory] =
    useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      buttonRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleAddNewSubcategory = () => {
    setIsAddingNewSubcategory(true);
    setFormData({ ...formData, subCategory: "" });
  };

  return (
    <div className="w-full h-[100vh] absolute top-0 left-0 z-50 bg-black bg-opacity-50 pt-20">
      <form
        onSubmit={handleSubmit}
        className="px-14 py-8 max-w-lg mx-auto bg-white rounded border space-y-4 text-xs"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="jobTitle">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            id="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-1 border-b text-gray-700 outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="subcategory">
            Subcategory
          </label>
          {isAddingNewSubcategory ? (
            <>
              <input
                type="text"
                name="newSubCategory"
                id="newSubCategory"
                value={formData.newSubCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border-b text-gray-700 outline-none"
              />
              <div className="mb-4">
                <div className="flex justify-between mt-2">
                  <label className="block text-gray-700 mb-2" htmlFor="image">
                    Add category Icon
                  </label>
                  <button
                    onClick={() => setIsAddingNewSubcategory(false)}
                    className="text-blue-500 hover:underline"
                  >
                    Close
                  </button>
                </div>
                <div className="relative w-16 h-16 border rounded flex justify-center items-center">
                  {formData.image ? (
                    <>
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 mt-1 mr-1 bg-red-400 text-white rounded-full px-1 hover:bg-black"
                        onClick={() =>
                          setFormData({ ...formData, image: null })
                        }
                      >
                        &times;
                      </button>
                    </>
                  ) : (
                    <label className="cursor-pointer text-gray-500">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span className="text-4xl">+</span>
                    </label>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative inline-block text-left w-[75%]">
                <button
                  ref={buttonRef}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  {formData.subCategory || "Select Subcategory"}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div
                    ref={menuRef}
                    className="origin-top-right absolute right-0 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-48 overflow-y-auto"
                  >
                    <div
                      className="py-1 w-full"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {getSubCategories.map((subCat, index) => (
                        <button
                          key={index}
                          className="block w-full text-start px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              subCategory: subCat.name,
                              subCategoryId: subCat.subId,
                            });
                            setIsOpen(false);
                          }}
                        >
                          {subCat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-[13px] font-normal text-gray-700 hover:bg-gray-50 w-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleAddNewSubcategory}
              >
                + Add
              </button>
            </>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="jobDescription">
            Job Description
          </label>
          <textarea
            name="description"
            id="jobDescription"
            value={formData.description}
            onChange={handleInputChange}
            className="px-3 py-1 w-full h-[5rem] border rounded text-gray-700 outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="hover:bg-black hover:text-white border font-semibold py-2 px-4 focus:outline-none focus:shadow-outline"
            onClick={() => setActiveAddCategoryPopup(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#23a0cd] hover:bg-black text-white hover:border font-semibold py-2 px-4 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCategory;
