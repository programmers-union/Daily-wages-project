import React, { useContext} from 'react';
import { FormProgressProps } from "../../../types/AdminGategoryType";
import WorkerFormContext from '../../../context/modules/WorkerFormData';
import { WorkerFormStateType } from '../../../types/WorkerTypes';

const Form04: React.FC<FormProgressProps> = ({ nextStep, prevStep }) => {
    const { formDataWorker, setFormDataWorker } = useContext(WorkerFormContext) as WorkerFormStateType
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormDataWorker(prevState => ({
            ...prevState,
            [id]: value
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
                <div className="w-1/2 text-center -mt-14">
                    <p className="text-[34px] ">We're almost there..!</p>
                </div>
                <div className="flex w-1/2 justify-center items-center pe-8">
                    <div className="w-[40vw] me-10">
                        <div className="flex space-x-4 mb-5">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="firstName" className="text-xs">A/C Holder Name</label>
                                <input
                                    aria-label="holder name"
                                    type="text"
                                    id="holderName"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.holderName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 w-1/2">
                                <label htmlFor="lastName" className="text-xs">A/C number</label>
                                <input
                                    aria-label="accout number"
                                    type="text"
                                    id="accoutNumber"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.accoutNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-5 mb-5">
                            <div className="mb-4 w-1/3">
                                <label htmlFor="bank" className="text-xs">Bank Name</label>
                                <input
                                    aria-label="Bank"
                                    type="text"
                                    id="bank"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.bank}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 w-1/3">
                                <label htmlFor="ifsc" className="text-xs">IFSC</label>
                                <input
                                    aria-label="IFSC"
                                    type="text"
                                    id="ifsc"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.ifsc}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 w-1/3">
                                <label htmlFor="branch" className="text-xs">Branch</label>
                                <input
                                    aria-label="Branch"
                                    type="text"
                                    id="branch"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.branch}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-5 mb-5">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="phoneNumber" className="text-xs">Linked Phone Number</label>
                                <input
                                    aria-label="linkPhone numberr"
                                    type="text"
                                    id="linkPhoneNumber"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.linkPhoneNumber}
                                    onChange={handleChange}
                                />
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
