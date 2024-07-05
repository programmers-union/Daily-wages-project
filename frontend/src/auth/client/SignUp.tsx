import React from 'react';
import { getCountryDataList } from 'countries-list';


const SignUp:React.FC = () => {

  const country = getCountryDataList();




  return (
    <div className='bg-custom-gradient'>
      <div className="flex  justify-center h-screen">
        <div className='bg-slate-800 h-screen w-full '>

        </div>
      <div className=" p-8   w-full ">
        <h2 className="text-2xl font-normal mb-6 text-center">Sign up</h2>
        <form className='w-3/4 m-auto'>
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="mb-4 w-full">
              <label htmlFor="first-name" className="block text-[12px] helvetic text-gray-700">First name</label>
              <input
                type="text"
                id="first-name"
                className="mt-1 bg-transparent   block w-full border-b border-gray-300 rounded py-2 px-3 outline-none "
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="last-name" className="block text-[12px] helvetic text-gray-700">Last name</label>
              <input
                type="text"
                id="last-name"
                className="mt-1 block w-full bg-transparent border-b border-gray-300 rounded py-2 px-3 outline-none "
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[12px] helvetic text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none "
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-[12px] helvetic text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none "
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-[12px] helvetic text-gray-700">Country</label>
            <select
              id="country"
              className="mt-1 block w-full border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none  text-[12px] "
             
            >
          {country.map((item)=>
              <option className='helvetic' >{item.name}</option>
            )} 
            </select>
            
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-black"
            >
              Create my account
            </button>
          </div>

          <div className="flex items-center mb-4">
            <div className="border-b border-gray-300 w-full"></div>
            <div className="text-gray-500 mx-4">or</div>
            <div className="border-b border-gray-300 w-full"></div>
          </div>
          <div className="flex justify-center mb-4">
            <button className="bg-black text-white text-xs w-full py-2 px-4 rounded mr-2 flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/128/179/179309.png" alt="Apple Logo" className="w-5 h-5 mr-2 text-sm" />
              Continue with Apple
            </button>
            <button className="bg-blue-500 text-white w-full py-2 text-xs px-4 rounded flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google Logo" className="w-5 h-5 mr-2 text-sm" />
              Continue with Google
            </button>
          </div>
          {/* <div className="text-center mt-4">
            <a href="#" className="text-blue-500 underline text-sm">Already have an account? Log In</a>
          </div> */}
        </form>
      </div>
    </div>
    </div>
  )
}

export default SignUp
