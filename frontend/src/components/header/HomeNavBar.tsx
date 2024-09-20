import React, {  useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  createAxiosInstance } from '../../context/modules/Interceptor';


const HomeNavBar:React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const navigate = useNavigate()
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  const logOutHandle = async ()=>{
    const axiosInstance = createAxiosInstance();
    setIsOpen(false)
    try {
      const response = await axiosInstance.post('http://localhost:5000/api/common/logout')
      console.log(response,'response')
      if(response.data.type === true){
        localStorage.removeItem('accessToken');
        navigate('/');
      }
    } catch (error) {
      console.log("logout is not success",error)
    }
  }
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
   
  return (
    <div className=''>
      <div className="px-5 pt-6 flex justify-between items-center ">
          <p className="font-bold text-[1.5rem]"><span className="text-blue-300">D</span><span className="text-slate-500">W</span></p>
          <ul className="flex items-center gap-6 font-normal text-sm justify-center cursor-pointer ">
          <Link to='/home'>
          <li>Home</li>
           </Link>
           
            <Link to='/client-calendar'>
            <li>Calendar</li>
            </Link>
            <li>About</li>
            <li>Category</li>
          </ul>
          <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md  "
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <img className='w-8 h-8 cursor-pointer' src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png" alt="" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0  w-32 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="" role="none">
            <Link to='/profile' >
            <button
              className="block px-4 border-b  border-gray-300 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
              role="menuitem"
            >
              Profile
            </button>
            </Link>
            <button
            onClick={logOutHandle}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
          {/* <div className="flex gap-2">
            <img className='w-8 h-8 cursor-pointer' src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png" alt="" />
          </div> */}
        </div>
    </div>
  )
}

export default HomeNavBar
