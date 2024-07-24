import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormProgressProps } from "../../../types/AdminGategoryType";
import WorkerFormContext from '../../../context/modules/WorkerFormData';
import { WorkerFormStateType } from '../../../types/WorkerTypes';

const Form05: React.FC<FormProgressProps> = ({ nextStep, prevStep }) => {

    const { formDataWorker, setFormDataWorker } = useContext(WorkerFormContext) as WorkerFormStateType

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormDataWorker(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormDataWorker(prevState => ({
            ...prevState,
            idProofFile: file || null // Ensure it's either a File or null
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Submitted:', formDataWorker);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex h-[80vh] w-[100vw] items-center">
                <div className="w-1/2 text-center">
                    <p className="text-[34px] w-3/4 ps-28 -mt-6">Hey! you're at last step..</p>
                </div>
                <div className="flex w-1/2 justify-center items-center pe-8">
                    <div className="w-[40vw] me-10 space-y-8">
                        <div className="mb-8">
                            <div className="flex space-x-5">
                                <div className="mb-4 w-1/2">
                                    <label htmlFor="idProof" className="text-xs">Select Id proof</label>
                                    <select
                                        aria-label="idProof"
                                        id="idProof"
                                        className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                        required
                                        value={formDataWorker.idProof}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Id proof</option>
                                        <option value="aadhar">Aadhar</option>
                                        <option value="pancard">Pan card</option>
                                        <option value="passport">Passport</option>
                                    </select>
                                </div>
                                <div className="mb-4 w-1/2">
                                    <label htmlFor="uniqueId" className="text-xs">Enter your unique id :</label>
                                    <input
                                        aria-label="uniqueId"
                                        type="text"
                                        id="uniqueId"
                                        className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                        required
                                        value={formDataWorker.uniqueId}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-4 w-1/2">
                                <label htmlFor="idProofFile" className="block text-gray-700 text-xs">Upload Id proof</label>
                                <input
                                    type="file"
                                    id="idProofFile"
                                    className="text-xs mt-1 block w-full border-b border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f9fc] rounded-full"
                                    required
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-8">
                            <div className="mb-4 text-start mt-8">
                                <Link to='/worker-sign-up'>
                                <button
                                    type="submit"
                                    className="py-2 px-4 border border-black hover:bg-black hover:text-white duration-300"
                                >
                                    Continue
                                </button>
                                </Link>
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
        </form>
    );
};

export default Form05;
