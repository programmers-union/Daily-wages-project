import React, { useState } from 'react';

interface MyCoomponent {
    slideBarClickHandler: (i: number, category: string) => void;
    dashboardData:{
        workerSideBarData:string[]
    }
}

const WorkerSection: React.FC<MyCoomponent> = ({slideBarClickHandler,dashboardData}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
   
    return (
        <div>
            <div
                className='flex gap-2 items-center hover:bg-gray-200 text-gray-600 cursor-pointer p-2'
                onClick={handleToggle}
            >
                <p className="title uppercase text-xs ">Worker Section</p>
                <svg
                    viewBox="0 0 24 24"
                    className={`w-4 ml-1.5 text-gray-400 dark:text-gray-600 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
            <ul
                className={`ml-2 mt-2 transition-all duration-300 ${
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                {dashboardData.workerSideBarData.map((nav, index) => (
                    <li onClick={()=>slideBarClickHandler(index,'workerSideBarData')}
                        className="flex-grow px-2 py-1 p-[.75rem] hover:text-blue-700 cursor-pointer text-sm text-blue-500 hover:bg-gray-400 rounded-sm"
                        key={index + 6}
                    >
                        {nav}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkerSection;
