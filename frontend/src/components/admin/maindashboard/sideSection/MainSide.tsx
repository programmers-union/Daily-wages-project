import React from 'react'
import ClientSection from './ClientSection';
import WorderSection from './WorderSection';

interface DashboardData {
    mainSideBarData: string[];
    clientSideBarData: string[];
    workerSideBarData: string[];
  }
interface MyCoomponent {
    slideBarClickHandler: (i: number, category: string) => void;
    dashboardData:DashboardData; 
}
  
const MainSide:React.FC<MyCoomponent> = ({ dashboardData , slideBarClickHandler}) => {
  return (
    <div >
        <div className=' custom-scrollbar-container h-[77vh] my-4 overflow-y-scroll px-4'>

       <nav className="pt-3">
                    <p className="title uppercase text-xs text-gray-600 tracking-wider">Main</p>
                    <ul className="ml-2 mt-2">
                        {dashboardData.mainSideBarData.map((nav, index) => (
                             <li onClick={()=>slideBarClickHandler(index,'mainSideBarData')} className="flex-grow px-2 py-1 p-[.75rem] hover:text-blue-700 cursor-pointer text-sm text-blue-500 hover:bg-gray-400 rounded-sm" key={index + 6}> {nav}
                            </li>
                        ))}
                    </ul>
                </nav>
                <ClientSection dashboardData={dashboardData} slideBarClickHandler={slideBarClickHandler} />
                <WorderSection dashboardData={dashboardData} slideBarClickHandler={slideBarClickHandler} />
        </div>
        <button className='bg-blue-600 hover:bg-blue-800 duration-300 py-2 px-4 w-full text-white text-center'>
            Log out
        </button>
    </div>
  )
}

export default MainSide
