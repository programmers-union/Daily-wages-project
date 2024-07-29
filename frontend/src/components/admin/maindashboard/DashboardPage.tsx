import React, { useContext, useEffect, useState } from 'react';
import MainCategory from '../category/MainCategory';
import AddNewCategory from '../category/AddNewCategory';
import axios from 'axios';
import { AdminFormListData } from '../../../types/AdminGategoryType';
import AdminFormContext from '../../../context/modules/AdminFormContext';
// import { FormProgressProps } from '../../../types/AdminGategoryType';

const DashboardPage: React.FC = () => {
    const [activeAddCategoryPopup, setActiveAddCategoryPopup] = useState<boolean>(false);
    // const subCategories = [
    //     'Cleaning', 'Laundry and Clothing Care', 'Organization', 'Maintenance and Repair',
    //     'Outdoor Tasks', 'Pet Care', 'Plant and Garden Care', 'Vehicle Care', 'Food and Kitchen Services',
    //     'Childcare and Supervision', 'Home and Property Services', 'Errands and Personal Assistance',
    //     'Event and Hospitality Services', 'Outdoor and Recreational Services', 'Odd Jobs and Miscellaneous Tasks',
    //     'Administrative and Data Services', 'Specialized Cleaning', 'Agricultural Tasks'
    //   ];
    const sideNav = [
        'Dashboard',
        'Reports',
        'Charts',
        'Products',
        'Category',
        'Inbox',
        'Settings'
    ];
      
    const topNavLeft = [
        'Home',
        'Name'
    ];
      
    const topNavRight = [
        'jin',
        'hungu'
    ];
      
    const mdIcons = [
        'mdi-ansible',
        'mdi-apple',
        'mdi-anvil',
        'mdi-android-studio',
        'mdi-meteor',
        'mdi-flask',
        'mdi-charity',
        'mdi-rake',
        'mdi-snake',
        'mdi-chart-areaspline',
        'mdi-chair-rolling',
        'mdi-shield-sun'
    ];
    const {setGetSubCategoryAndItems} = useContext(
        AdminFormContext
      ) as AdminFormListData;
    useEffect(() => {
        const GetMainCategory = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5000/api/admin/get-sub-categories"
            );
            const categories = response.data;
            console.log(response.data);
    
            // const key = "66910ef763e78be1c1d7e518"; 
            // const items = categories[0][key].map((item: { name: string }) => item.name);
            setGetSubCategoryAndItems(categories);
    
            console.log("Categories fetched", response.data);
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
      }, []);
    return (
        <>
        <div className='min-w-[1024px] flex content-center sm:max-w-screen-xl mx-auto'>
            <div className="one w-[240px] bg-slate-100 px-2 pl-5 h-screen py-3 fixed top-0 left-0">
                <div className="store text-blue-800 font-medium px-1 py-2 mb-3">
                    <div className="flex items-center gap-2">
                    <p className="font-bold text-[1.5rem]"><span className="text-blue-300">D</span><span className="text-slate-500">W</span></p>
                    </div>
                </div>
                <nav className="pt-3">
                    <p className="title uppercase text-xs text-gray-600 tracking-wider">Main</p>
                    <ul className="ml-2 mt-2">
                        <li className="flex-grow px-2 py-1">
                            <a className="text-sm tracking-wide text-blue-900 hover:text-blue-700 active" href="#">
                                <i className="mdi mdi-account"></i> Super
                            </a>
                        </li>
                        {sideNav.map((nav, index) => (
                            <li className="flex-grow px-2 py-1 p-[.75rem] hover:bg-gray-300 rounded-md" key={index}>
                                <a className="text-sm font-light text-blue-900 hover:text-blue-700" href="#">
                                    <i className={`mdi ${mdIcons[index]}`}></i> {nav}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="title uppercase text-xs text-gray-600 mt-3">Store</p>
                    <ul className="ml-2 mt-2">
                        {sideNav.map((nav, index) => (
                            <li className="flex-grow px-2 py-1 p-[.75rem]" key={index + 6}>
                                <a className="text-core font-light tracking-wide text-blue-900 hover:text-blue-700" href="#">
                                    <i className={`mdi ${mdIcons[index + 6]}`}></i> {nav}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <section className="box-border relative w-full ml-[240px] h-screen overflow-y-scroll">
                <nav className=" bg-slate-100 shadow-sm z-[11] sticky top-0 box-border inline-flex flex-grow w-full  py-6 pr-6 overflow-hidden">
                    <div className="top-nav-left flex flex-grow items-start">
                        <ul className="flex self-center">
                            {topNavLeft.map((nav, index) => (
                                <li className="text-gray-700" key={index}>{nav}</li>
                            ))}
                        </ul>
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
