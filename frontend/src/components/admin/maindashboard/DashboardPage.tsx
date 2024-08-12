import React, { useContext, useEffect, useState } from 'react';
import MainCategory from '../category/MainCategory';
import AddNewCategory from '../category/AddNewCategory';
import axios from 'axios';
import { AdminFormListData } from '../../../types/AdminGategoryType';
import AdminFormContext from '../../../context/modules/AdminFormContext';
import MainSide from './sideSection/MainSide';
// import { FormProgressProps } from '../../../types/AdminGategoryType';

const DashboardPage: React.FC = () => {
    const [activeAddCategoryPopup, setActiveAddCategoryPopup] = useState<boolean>(false);

    const topNavRight = [
        'jin',
        'hungu'
    ];
      

    const {setGetSubCategories ,setGetSubCategoriesItemsDatas} = useContext(
        AdminFormContext
      ) as AdminFormListData;

    useEffect(() => {
        const GetMainCategory = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5000/api/admin/get-sub-categories"
            );
            const categories = response.data;
            setGetSubCategories(categories);
    
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error(
                "Error fetching categories:",
                error.response?.data?.message
              );
              throw error.response?.data?.message || "Error fetching categories";
            } else {
              console.error("An unexpected error occurred:", error);
              throw "An unexpected error occurred";
            }
          }
        };
        GetMainCategory();
      }, [setGetSubCategories]);

    useEffect(() => {
        const GetMainCategory = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5000/api/admin/get-sub-category-items"
            );
            const categories = response.data.subCategoryItems;
            setGetSubCategoriesItemsDatas(categories);
    
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error(
                "Error fetching categories:",
                error.response?.data?.message
              );
              throw error.response?.data?.message || "Error fetching categories";
            } else {
              console.error("An unexpected error occurred:", error);
              throw "An unexpected error occurred";
            }
          }
        };
        GetMainCategory();
      }, [setGetSubCategoriesItemsDatas]);
    return (
        <>
        <div className='min-w-[1024px] flex content-center sm:max-w-screen-xl mx-auto'>
            <div className="one w-[240px] bg-slate-100   h-screen py-3 fixed top-0 left-0">
                <div className="store text-blue-800 font-medium px-1 py-2 mb-3">
                    <div className="flex items-center gap-2">
                    <p className="font-bold text-[1.5rem]"><span className="text-blue-300">D</span><span className="text-slate-500">W</span></p>
                    </div>
                </div>
               <MainSide />
            </div>
            <section className="box-border relative w-full ml-[240px] h-screen overflow-y-scroll">
                <nav className=" bg-slate-100 shadow-sm z-[11] sticky top-0 box-border inline-flex flex-grow w-full  py-6 pr-6 overflow-hidden">
                    <div className="top-nav-left flex flex-grow items-start">
                        <div className="inline-flex self-center">
                            <input className="min-w-[250px] ml-2 px-4 h-8 content-center shadow rounded-l" type="text" placeholder="Press / to focus search" />
                            <button className="btn inline-block text-white text-core bg-green-500 hover:bg-green-600 h-8 px-2 py-1 -ml-1 rounded-r shadow">
                                <i className="mdi mdi-magnify text-2xl text-center leading-none"></i>
                            </button>
                        </div>
                    </div>
                    <div className="top-nav-right">
                        <ul className="flex justify-end items-center">
                            {topNavRight.map((nav, index) => (
                                <li className="inline-block" key={index}>
                                    <a className="text-gray-700" href="#">
                                        <i className="mdi mdi-login"></i> {nav}
                                    </a>
                                </li>
                            ))}
                            <li className="inline-block">
                                <a href="#">
                                    <img className="h-8 rounded-full shadow" src="https://gravatar.com/avatar/d69aae377ffa1f6fd90935a888933070" alt="Profile" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
              <MainCategory setActiveAddCategoryPopup={setActiveAddCategoryPopup} />
            </section>
        </div>
        {activeAddCategoryPopup && <AddNewCategory setActiveAddCategoryPopup={setActiveAddCategoryPopup} />}
        </>
    );
};

export default DashboardPage;
