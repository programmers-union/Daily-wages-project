import React, { useState } from 'react'

const Login:React.FC = () => {
  const [passwordBox, setPasswordBox ] = useState('')
  return (
    <div className=''>
      <div className="flex items-center justify-center min-h-screen">
      <div className='bg-slate-800 h-screen w-full '>

</div>
      <div className=" p-8   w-full ">
        <h2 className="text-2xl font-normal mb-6 text-center">Login</h2>
        <p className='w-3/4 m-auto text-xs helvetic '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa corporis accusantium sunt, a magni quod.</p>
        <form className='w-3/4 m-auto'>
         
          <div className="mb-4">
            <label htmlFor="email" className="block text-[12px] text-gray-700 mt-10 helvetic ">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border-b bg-transparent border-gray-300 rounded py-2 px-3  outline-none "
              required
            />
          </div>
          {passwordBox === 'password' && 
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-[12px] helvetic ">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none"
              required
            />
          </div>
          }
      <div className='flex justify-between'>
        <div className='flex items-center gap-1'>
          <input className='cursor-pointer' type="checkbox" /> <span className='text-xs helvetic '>Remember me</span>
        </div>
        <h6 className='underline text-xs cursor-pointer helvetic '>Forgot password?</h6>
      </div>
          <div className='my-6'>
            <button
             onClick={()=>setPasswordBox('password')}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-black"
            >
              Continue
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <button className="bg-black w-full text-white py-2 text-[12px] helvetic  px-4 rounded mr-2 flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/128/179/179309.png" alt="Apple Logo" className="w-5 h-5 mr-2" />
              Continue with Apple
            </button>
            <button className="bg-black w-full text-white text-[12px] helvetic  py-2 px-4 rounded flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google Logo" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login
