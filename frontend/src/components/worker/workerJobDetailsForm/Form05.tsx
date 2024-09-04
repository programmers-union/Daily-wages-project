import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
import { FormProgressProps } from "../../../types/AdminGategoryType";
import WorkerFormContext from '../../../context/modules/WorkerFormData';
import { WorkerFormStateType } from '../../../types/WorkerTypes';
import { useNavigate } from 'react-router-dom';

const Form05: React.FC<FormProgressProps> = ({  prevStep }) => {
    const { formDataWorker, setFormDataWorker } = useContext(WorkerFormContext) as WorkerFormStateType;
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormDataWorker(prevState => ({
            ...prevState,
            [id]: value.trim() // Trim whitespace
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormDataWorker(prevState => ({
                ...prevState,
                idProofFile: file,
                profilePic : file
            }));
        }
    };

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formDataWorker.idProof) {
            newErrors.idProof = "Id proof is required";
        }
        if (!formDataWorker.uniqueId) {
            newErrors.uniqueId = "Unique Id is required";
        }
        if (!formDataWorker.idProofFile) {
            newErrors.idProofFile = "Id proof file is required";
        }
        if (!formDataWorker.profilePic) {
            newErrors.profilePic = "Id proof file is required";
        }
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log(formDataWorker,'....formDataWorker....')
            setFormDataWorker(formDataWorker)
            navigate('/worker-sign-up')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex h-[80vh] w-[100vw] items-center">
                <div className="w-1/2 text-center">
                    <p className="text-[34px] w-3/4 ps-28 -mt-6">Hey! you're at the last step..</p>
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
                                        className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent"
                                        value={formDataWorker.idProof}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Id proof</option>
                                        <option value="aadhar">Aadhar</option>
                                        <option value="pancard">Pan card</option>
                                        <option value="passport">Passport</option>
                                    </select>
                                    {errors.idProof && <p className="text-red-500 text-xs mt-1">{errors.idProof}</p>}
                                </div>
                                <div className="mb-4 w-1/2">
                                    <label htmlFor="uniqueId" className="text-xs">Enter your unique id :</label>
                                    <input
                                        aria-label="uniqueId"
                                        type="text"
                                        id="uniqueId"
                                        className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent"
                                        value={formDataWorker.uniqueId}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.uniqueId && <p className="text-red-500 text-xs mt-1">{errors.uniqueId}</p>}
                                </div>
                            </div>
                            <div className="flex space-x-5">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="idProofFile" className="block text-gray-700 text-xs">Upload Id proof</label>
                                <input
                                    type="file"
                                    id="idProofFile"
                                    name='idProofFile'
                                    className="text-xs mt-1 block w-full border-b border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f9fc] bg-transparent"
                                    onChange={handleFileChange}
                                    required
                                />
                                {errors.idProofFile && <p className="text-red-500 text-xs mt-1">{errors.idProofFile}</p>}
                            </div>
                            <div className="mb-4 w-1/2">
                                <label htmlFor="profilePic" className="block text-gray-700 text-xs">upload profile pic</label>
                                <input
                                    type="file"
                                    id="profilePic"
                                    name='profilePic'
                                    className="text-xs mt-1 block w-full border-b border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f9fc] bg-transparent"
                                    onChange={handleFileChange}
                                    required
                                />
                                {errors.profilePic && <p className="text-red-500 text-xs mt-1">{errors.profilePic}</p>}
                            </div>

                            </div>
                        </div>
                        <div className="flex space-x-8">
                            <div className="mb-4 text-start mt-8">
                                <button
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
        </form>
    );
};

export default Form05;
