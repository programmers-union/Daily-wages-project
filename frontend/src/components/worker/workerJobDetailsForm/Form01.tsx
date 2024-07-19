import React, { useContext } from 'react';
import { FormProgressProps } from '../../../types/AdminGategoryType';
import { WorkerFormContext } from '../../../context/modules/WorkerFormData';
import { WorkerFormStateType } from '../../../types/WorkerTypes';

const Form01: React.FC<FormProgressProps> = ({ nextStep }) => {
  const { formDataWorker, setFormDataWorker } = useContext(WorkerFormContext) as WorkerFormStateType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormDataWorker((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    nextStep();
  };

  return (
    <>
      <div className="flex h-[80vh] w-[100vw] items-center">
        <div className="w-1/2 text-center">
          <p className="text-[34px] -mt-14">Let's build a Profile..</p>
        </div>
        <div className="flex w-1/2 pe-8 justify-center items-center">
          <div className="w-[40vw] me-10">
            <div className="flex space-x-5 mb-5">
              <div className="mb-4 w-1/2">
                <label htmlFor="firstName" className="text-xs">
                  First Name <span className="text-red-700">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={formDataWorker.firstName}
                  aria-label="first name"
                  type="text"
                  id="firstName"
                  className="text-xs mt-1 w-full border-b py-2 border-gray-300 px-3 outline-none bg-transparent"
                  required
                />
              </div>
              <div className="mb-4 w-1/2">
                <label htmlFor="lastName" className="text-xs">Last Name</label>
                <input
                  onChange={handleChange}
                  value={formDataWorker.lastName}
                  aria-label="last name"
                  type="text"
                  id="lastName"
                  className="text-xs mt-1 w-full border-b py-2 border-gray-300 px-3 outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-5 mb-5">
              <div className="mb-4 w-1/3">
                <label htmlFor="dob" className="text-xs">Date of Birth</label>
                <input
                  onChange={handleChange}
                  value={formDataWorker.dob}
                  aria-label="dob"
                  type="date"
                  id="dob"
                  name="dob"
                  className="text-xs mt-1 w-full border-b py-2 border-gray-300 px-3 outline-none bg-transparent"
                  required
                />
              </div>
              <div className="mb-4 w-1/2">
                <label htmlFor="gender" className="text-xs">Gender</label>
                <select
                  onChange={handleChange}
                  value={formDataWorker.gender}
                  aria-label="gender"
                  id="gender"
                  className="text-xs mt-1 w-full border-b py-2 px-3 border-gray-300 outline-none bg-transparent"
                  required
                >
                  <option value="" disabled></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4 text-start mt-6">
              <button
                onClick={handleSubmit}
                type="submit"
                className="py-2 px-4 border border-black hover:bg-black hover:text-white duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form01;
