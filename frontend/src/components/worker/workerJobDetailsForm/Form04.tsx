import React, { useContext, useState } from 'react';
import { FormProgressProps } from "../../../types/AdminGategoryType";
import WorkerFormContext from '../../../context/modules/WorkerFormData';
import { WorkerFormStateType } from '../../../types/WorkerTypes';

const Form04: React.FC<FormProgressProps> = ({ nextStep, prevStep }) => {
    const [errors, setErrors] = useState({
        holderName: '',
        accoutNumber: '',
        bank: '',
        ifsc: '',
        branch: '',
        linkPhoneNumber: '',
    });

    const { formDataWorker, setFormDataWorker } = useContext(WorkerFormContext) as WorkerFormStateType;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const trimmedValue = value.trim(); // Trim spaces
        setFormDataWorker(prevState => ({
            ...prevState,
            [id]: trimmedValue
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [id]: ''
        }));
    };

    const validate = () => {
        const newErrors = {
            holderName: formDataWorker.holderName.trim() === '' ? 'A/C Holder Name is required' : '',
            accoutNumber: formDataWorker.accoutNumber.trim() === '' ? 'A/C number is required' : '',
            bank: formDataWorker.bank.trim() === '' ? 'Bank name is required' : '',
            ifsc: formDataWorker.ifsc.trim() === '' ? 'IFSC is required' : '',
            branch: formDataWorker.branch.trim() === '' ? 'Branch is required' : '',
            linkPhoneNumber: formDataWorker.linkPhoneNumber.trim() === '' ? 'Linked Phone Number is required' : '',
        };

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            console.log(formDataWorker, '....formDataWorker....');
            setFormDataWorker(formDataWorker);
            nextStep();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex h-[80vh] w-[100vw] items-center">
                <div className="w-1/2 text-center -mt-14">
                    <p className="text-[34px]">We're almost there..!</p>
                </div>
                <div className="flex w-1/2 justify-center items-center pe-8">
                    <div className="w-[40vw] me-10">
                        <div className="flex space-x-4 mb-5">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="holderName" className="text-xs">A/C Holder Name</label>
                                <input
                                    aria-label="holder name"
                                    type="text"
                                    id="holderName"
                                    className={`text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent ${errors.holderName ? 'border-red-500' : ''}`}
                                    value={formDataWorker.holderName}
                                    onChange={handleChange}
                                />
                                {errors.holderName && <p className="text-red-500 text-xs mt-1">{errors.holderName}</p>}
                            </div>
                            <div className="mb-4 w-1/2">
                                <label htmlFor="accoutNumber" className="text-xs">A/C Number</label>
                                <input
                                    aria-label="accout number"
                                    type="text"
                                    id="accoutNumber"
                                    className={`text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent ${errors.accoutNumber ? 'border-red-500' : ''}`}
                                    value={formDataWorker.accoutNumber}
                                    onChange={handleChange}
                                />
                                {errors.accoutNumber && <p className="text-red-500 text-xs mt-1">{errors.accoutNumber}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-5 mb-5">
                            <div className="mb-4 w-1/3">
                                <label htmlFor="bank" className="text-xs">Bank Name</label>
                                <input
                                    aria-label="Bank"
                                    type="text"
                                    id="bank"
                                    className={`text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent ${errors.bank ? 'border-red-500' : ''}`}
                                    value={formDataWorker.bank}
                                    onChange={handleChange}
                                />
                                {errors.bank && <p className="text-red-500 text-xs mt-1">{errors.bank}</p>}
                            </div>
                            <div className="mb-4 w-1/3">
                                <label htmlFor="ifsc" className="text-xs">IFSC</label>
                                <input
                                    aria-label="IFSC"
                                    type="text"
                                    id="ifsc"
                                    className={`text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent ${errors.ifsc ? 'border-red-500' : ''}`}
                                    value={formDataWorker.ifsc}
                                    onChange={handleChange}
                                />
                                {errors.ifsc && <p className="text-red-500 text-xs mt-1">{errors.ifsc}</p>}
                            </div>
                            <div className="mb-4 w-1/3">
                                <label htmlFor="branch" className="text-xs">Branch</label>
                                <input
                                    aria-label="Branch"
                                    type="text"
                                    id="branch"
                                    className={`text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent ${errors.branch ? 'border-red-500' : ''}`}
                                    value={formDataWorker.branch}
                                    onChange={handleChange}
                                />
                                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-5 mb-5">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="linkPhoneNumber" className="text-xs">Linked Phone Number</label>
                                <input
                                    aria-label="linkPhone number"
                                    type="text"
                                    id="linkPhoneNumber"
                                    className={`text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent ${errors.linkPhoneNumber ? 'border-red-500' : ''}`}
                                    value={formDataWorker.linkPhoneNumber}
                                    onChange={handleChange}
                                />
                                {errors.linkPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors.linkPhoneNumber}</p>}
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

export default Form04;
