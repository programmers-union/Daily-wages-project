import  React from 'react'
import { Link } from "react-router-dom";

const Navbar:React.FC = () => {
  return (
    <div>
       <div className="px-5 pt-6 flex justify-between items-center ">
          <p className="font-bold text-[1.5rem]"><span className="text-blue-300">D</span><span className="text-slate-500">W</span></p>
          <ul className="flex items-center gap-6 font-normal text-sm justify-center cursor-pointer ">
            <li>Home</li>
            <li>Sechdule</li>
            <li>About</li>
            <li>Sechdule</li>
          </ul>
          <div className="flex gap-2">
            <Link to='/login'>
            <p className="text-sm px-6 py-1 cursor-pointer hover:bg-slate-800 hover:text-white  border rounded-sm ">
              Log In
            </p>
            </Link>
            <Link to='/sign-up' >
            <p className="text-sm px-6 py-1 cursor-pointer hover:bg-slate-800 hover:text-white   border  rounded-sm ">
              Sign Up
            </p>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Navbar
