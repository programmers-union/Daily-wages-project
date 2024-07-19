import React, { useContext, useState } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import WorkerFormContext from '../../context/modules/WorkerFormData';
import { WorkerFormStateType } from '../../types/WorkerTypes';

const SignUp: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const { formDataWorker, setFormDataWorker, WorkerSignUp } = useContext(WorkerFormContext) as WorkerFormStateType;
  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
    setFormDataWorker((prevData) => ({
      ...prevData,
      phoneNumber: newPhoneNumber,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormDataWorker((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       WorkerSignUp(formDataWorker);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <div className="bg-custom-gradient">
      <div className="flex justify-center h-screen">
        <div className="bg-slate-800 h-screen w-full"></div>
        <div className="p-8 w-full">
          <h2 className="text-2xl font-normal mb-6 text-center helvetic">Sign up</h2>
          <form onSubmit={handleSubmit} className="w-3/4 m-auto">
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="mb-4 w-full">
                <label htmlFor="firstName" className="block text-[12px] helvetic text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formDataWorker.firstName}
                  onChange={handleChange}
                  className="mt-1 text-[14px] helvetic bg-transparent block w-full border-b border-gray-300 rounded py-2 px-3 outline-none"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="lastName" className="block text-[12px] helvetic text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formDataWorker.lastName}
                  onChange={handleChange}
                  className="mt-1 text-[14px] helvetic block w-full bg-transparent border-b border-gray-300 rounded py-2 px-3 outline-none"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[12px] helvetic text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formDataWorker.email}
                onChange={handleChange}
                className="mt-1 text-[14px] helvetic block w-full border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-[12px] helvetic text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formDataWorker.password}
                onChange={handleChange}
                className="mt-1 text-[14px] helvetic block w-full border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-[12px] helvetic text-gray-700">
                Mobile Number
              </label>
              <MuiTelInput
                className="mt-1 block w-full text-[14px] helvetic border-b bg-transparent border-gray-300 rounded py-2 px-3 outline-none"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                defaultCountry="IN"
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-500 text-[16px] helvetic text-white py-2 px-4 rounded hover:bg-black">
                Create my account
              </button>
            </div>
          </form>
          <div className="flex items-center mb-4">
            <div className="border-b border-gray-300 w-full"></div>
            <div className="text-gray-500 mx-4">or</div>
            <div className="border-b border-gray-300 w-full"></div>
          </div>
          <div className="flex justify-center mb-4">
            <button className="bg-black text-white text-xs w-full py-2 px-4 rounded mr-2 flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/179/179309.png"
                alt="Apple Logo"
                className="w-5 h-5 mr-2 text-sm"
              />
              Continue with Apple
            </button>
            <button className="bg-blue-500 text-white w-full py-2 text-xs px-4 rounded flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                alt="Google Logo"
                className="w-5 h-5 mr-2 text-sm"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
