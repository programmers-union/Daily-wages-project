import React, { useState } from 'react';
import { MainCategoryProps } from '../../../types/AdminGategoryType';
import TableFilter from './TableFilter';

const SkillCategoryTable: React.FC<MainCategoryProps> = ({setActiveAddCategoryPopup}) => {
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const TableHeadContent = [
        "Image",
        "Name",
        "Category",
        "Amount",
    ];
    
    const TableListData = [
        {
            id: 1,
            image: "https://example.com/image1.jpg",
            name: "Product 1",
            category: "Electronics",
            amount: "$100.00",
            time: "1 hour",
            date: "2022-01-01",
            totalWork: "10 hours",
            status: "Completed",
        },
        {
            id: 2,
            image: "https://example.com/image2.jpg",
            name: "Product 2",
            category: "Electronics",
            amount: "$200.00",
            time: "2 hours",
            date: "2022-02-01",
            totalWork: "20 hours",
            status: "Completed",
        },
        {
            id: 3,
            image: "https://example.com/image3.jpg",
            name: "Product 3",
            category: "Electronics",
            amount: "$300.00",
            time: "3 hours",
            date: "2022-03-01",
            totalWork: "30 hours",
            status: "Pending",
        },
        {
            id: 4,
            image: "https://example.com/image4.jpg",
            name: "Product 4",
            category: "Electronics",
            amount: "$400.00",
            time: "4 hours",
            date: "2022-04-01",
            totalWork: "40 hours",
            status: "Completed",
        },
        {
            id: 5,
            image: "https://example.com/image5.jpg",
            name: "Product 5",
            category: "Electronics",
            amount: "$500.00",
            time: "5 hours",
            date: "2022-05-01",
            totalWork: "50 hours",
            status: "Completed",
        },
    ];
  

    return (  
            <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto ">
                <div className="sm:p-7 p-4">
                    
                    {/* <div className="flex w-full gap-4 justify-between items-center mb-7">
                        <div className='flex gap-4 items-center'>

                        <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                            <svg viewBox="0 0 24 24" className="w-4 mr-2 text-gray-400 dark:text-gray-600" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            Last 30 days
                            <svg viewBox="0 0 24 24" className="w-4 ml-1.5 text-gray-400 dark:text-gray-600" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                            Filter by
                            <svg viewBox="0 0 24 24" className="w-4 ml-1.5 text-gray-400 dark:text-gray-600" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <button onClick={()=>setActiveAddCategoryPopup(true)} className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow bg-blue-700 text-white hover:bg-blue-500 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                            Add Category
                        </button>
                        </div>
                        <div className=''>
                    <button className="inline-flex hover:bg-gray-200   mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                           
                            Cleaning Category 
                            <svg viewBox="0 0 24 24" className="w-4 ml-1.5 text-gray-400 dark:text-gray-600" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <div className="ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center">
                            <span className="mr-3"> 2 / 4</span>
                            <button className="inline-flex mr-2 items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
                                <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
                                <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                    </div> */}
                    <TableFilter  setActiveAddCategoryPopup={setActiveAddCategoryPopup} />
                    <div className="custom-scrollbar-container  overflow-x-auto border border-gray-100 ">
                        <div className="inline-block min-w-full">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-gray-200 sticky top-0 z-10">
                                        <tr>
                                            {TableHeadContent.map((item) =>
                                                <th key={item} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{item}</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {TableListData.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img src='https://cdn-icons-png.flaticon.com/128/2829/2829961.png' alt="Item" className="h-10 w-10 " />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-green-500">{item.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.time}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.totalWork}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button className={`px-3 py-1 ${item.status === "Done" ? "bg-green-500" : item.status === "Completed" ? "bg-blue-300" : "bg-yellow-300"}  w-28 rounded-full text-xs`}>
                                                        {item.status}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="relative inline-block text-left">
                                                        <button onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)} className="text-gray-500 hover:text-gray-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        {activeDropdown === item.id && (
                                                            <div className="origin-top-right absolute right-0  w-28 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5">
                                                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</a>
                                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Edit</a>
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
                        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
                            <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">1</button>
                        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-white leading-none">2</button>
                        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">3</button>
                        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">4</button>
                        <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
                            <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
           
            </div>
        
    );
}

export default SkillCategoryTable;









