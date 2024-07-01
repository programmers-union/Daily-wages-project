import React from 'react'

const SignUp:React.FC = () => {
  return (
    <div className='bg-custom-gradient'>
      <div className="flex items-center justify-center min-h-screen">
      <div className=" p-8   w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
        <form>
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="mb-4 w-full">
              <label htmlFor="first-name" className="block text-gray-700">First name</label>
              <input
                type="text"
                id="first-name"
                className="mt-1 bg-transparent  block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="last-name" className="block text-gray-700">Last name</label>
              <input
                type="text"
                id="last-name"
                className="mt-1 block w-full bg-transparent border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border bg-transparent border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border bg-transparent border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-red-500 mt-1">Password is required</p>
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700">Country</label>
            <select
              id="country"
              className="mt-1 block w-full border bg-transparent border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 "
            >
              <option >India</option>
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
            <button className="bg-black text-white py-2 px-4 rounded mr-2 flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/128/179/179309.png" alt="Apple Logo" className="w-5 h-5 mr-2" />
              Continue with Apple
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google Logo" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          </div>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-500 underline">Already have an account? Log In</a>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default SignUp
