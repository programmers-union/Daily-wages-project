import React, { useContext, useState } from 'react';
import { AdminFormData, AdminFormListData, MainCategoryProps } from '../../../types/AdminGategoryType';
import AdminFormContext from '../../../context/modules/AdminFormContext'; // This line is correct if default export

const AddNewCategory: React.FC<MainCategoryProps> = ({ setActiveAddCategoryPopup }) => {
  const [formData, setFormData] = useState<AdminFormData>({
    image: null,
    category: '',
    subcategory: '',
    jobTitle: '',
    description: ''
  });

  const { AdminFormAdding } = useContext(AdminFormContext) as AdminFormListData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'image') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        setFormData({
          ...formData,
          [name]: target.files[0]
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      AdminFormAdding(formData);
      setActiveAddCategoryPopup(false);

    } catch (error) {
      console.log(error, 'error admin');
    }
  };

  return (
    <div className='w-full h-[100vh] absolute top-0 left-0 z-50 bg-black bg-opacity-50 pt-20'>
      <form onSubmit={handleSubmit} className="px-14 py-8 max-w-lg mx-auto bg-white rounded border space-y-4 text-xs">
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
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-1 border-b text-gray-700 outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="subcategory">
            Subcategory
          </label>
          <input
            type="text"
            name="subcategory"
            id="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            className="w-full px-3 py-1 border-b text-gray-700 outline-none"
          />
        </div>
        <div className='flex'>
          <div className="mb-4 w-full">
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
          <div className="mb-4 ms-5">
            <label className="block text-gray-700 mb-2" htmlFor="image">
              Add category Icon
            </label>
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
                    onClick={() => setFormData({ ...formData, image: null })}
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
