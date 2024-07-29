import React, { useState } from 'react';
import { MainCategoryProps } from '../../../types/AdminGategoryType';
import TableFilter from './TableFilter';

const CategoryListTable: React.FC<MainCategoryProps> = ({setActiveAddCategoryPopup}) => {
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const TableHeadContent = [
        "No",
        "Name",
        "Category",
        "Date",
    ];
    
    const TableListData = [
        {
            id: 101,
            no: 1,
            name: "Product 1",
            category: "Electronics",
            date: "2022-01-01",
            totalWork: "10 hours",
        },
        {
            id: 102,
            no: 2,
            name: "Product 2",
            category: "Electronics",
            date: "2022-02-01",
            totalWork: "20 hours",
        },
        {
            id: 103,
            no: 3,
            name: "Product 3",
            category: "Electronics",
            date: "2022-03-01",
            totalWork: "30 hours",
        },
        {
            id: 104,
            no: 4,
            name: "Product 4",
            category: "Electronics",
            date: "2022-04-01",
            totalWork: "40 hours",
        },
        {
            id: 105,
            no: 5,
            name: "Product 5",
            category: "Electronics",
            date: "2022-05-01",
            totalWork: "50 hours",
        },
    ];
  

    return (  
            <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto ">
                <div className="sm:p-7 p-4">
                    <TableFilter setActiveAddCategoryPopup={setActiveAddCategoryPopup} />
                    <div className="custom-scrollbar-container  overflow-x-auto border border-gray-100 ">
                        <div className="inline-block min-w-full">
                            <div className="overflow-hidden ">
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
                                                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                                                    {item.no}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{item.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{item.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{item.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="relative inline-block text-left">
                                                        <button onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)} className="text-gray-500 hover:text-gray-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        {activeDropdown === item.id && (
                                                            <div className="origin-top-right absolute  right-0  w-28 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5">
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

export default CategoryListTable;
