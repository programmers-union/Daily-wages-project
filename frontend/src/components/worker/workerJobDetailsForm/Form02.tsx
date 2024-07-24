import React, { useContext } from 'react';
import {  WorkerFormStateType } from '../../../types/WorkerTypes';
import WorkerFormContext from '../../../context/modules/WorkerFormData';
import { FormProgressProps } from '../../../types/AdminGategoryType';


const Form02: React.FC<FormProgressProps> = ({ nextStep, prevStep }) => {

  const { formDataWorker, setFormDataWorker } = useContext(WorkerFormContext) as WorkerFormStateType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormDataWorker((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formDataWorker,'****');
    nextStep();
  };

  return (
    <>
      <div className="flex h-[80vh] w-[100vw] items-center">
        <div className="w-1/2 text-center">
          <p className="text-[34px] w-3/4 ps-28 -mt-10">Okay..Let's add the address</p>
        </div>
        <div className="flex w-1/2 justify-center items-center pe-8">
          <div className="w-[40vw] me-10">
            <div className="flex space-x-5 mb-5">
              <div className="mb-4 w-1/2">
                <label htmlFor="address" className="text-xs">Address</label>
                <input
                  onChange={handleChange}
                  value={formDataWorker.address} 
                  aria-label="address"
                  type="text"
                  id="address"
                  className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                  required
                />
              </div>
              <div className="mb-4 w-1/2">
                <label htmlFor="selectState" className="text-xs">Select State</label>
                <select
                  onChange={handleChange}
                  value={formDataWorker.selectState} 
                  aria-label="select state"
                  id="selectState"
                  className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                  required
                >
                  <option value="" disabled></option>
                  <option value="kerala">Kerala</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamilnadu">Tamil Nadu</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-5">
              <div className="mb-4 w-1/3">
                <label htmlFor="selectDistrict" className="text-xs">Select District</label>
                <select
                  onChange={handleChange}
                  value={formDataWorker.selectDistrict} 
                  aria-label="select district"
                  id="selectDistrict"
                  className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                  required
                >
                  <option value="" disabled></option>
                  <option value="Alappuzha">Alappuzha</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Idukki">Idukki</option>
                </select>
              </div>
              <div className="mb-4 w-1/3">
                <label htmlFor="selectCity" className="text-xs">Select City</label>
                <select
                  onChange={handleChange}
                  value={formDataWorker.selectCity} 
                  aria-label="select city"
                  id="selectCity"
                  className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                  required
                >
                  <option value="" disabled></option>
                  <option value="kerala">Kerala</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamilnadu">Tamil Nadu</option>
                </select>
              </div>
              <div className="mb-4 w-1/3">
                <label htmlFor="pinCode" className="text-xs">Pin Code</label>
                <select
                  onChange={handleChange}
                  value={formDataWorker.pinCode} 
                  aria-label="pin code"
                  id="pinCode"
                  className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                  required
                >
                  <option value="" disabled></option>
                  <option value="123923">123923</option>
                  <option value="674332">674332</option>
                  <option value="987346">987346</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-8">
              <div className="mb-4 text-start mt-8">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="py-2 px-4 border border-black hover:bg-black hover:text-white duration-300"
                >
                  Continue
                </button>
              </div>
              <div className="mb-4 text-start mt-8">
                <button
                  onClick={prevStep}
                  type="button"
                  className="py-2 px-4 border border-black hover:bg-black hover:text-white duration-300"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form02;
