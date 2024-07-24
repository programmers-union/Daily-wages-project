import React, { useContext } from 'react';
import { FormProgressProps } from "../../../types/AdminGategoryType";
import { WorkerFormStateType } from '../../../types/WorkerTypes';
import WorkerFormContext from '../../../context/modules/WorkerFormData';

const Form03: React.FC<FormProgressProps> = ({ nextStep, prevStep }) => {

    const { formDataWorker, setFormDataWorker } = useContext(WorkerFormContext) as WorkerFormStateType
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                <div className="w-1/2 text-center">
                    <p className="text-[34px] w-3/4 ps-28 -mt-12">Great.. How about adding some skills</p>
                </div>
                <div className="flex w-1/2 justify-center items-center pe-8">
                    <div className="w-[40vw] me-10">
                        <div className="flex space-x-5 mb-5">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="skills" className="text-xs">Enter your Skills</label>
                                <input
                                    aria-label="skills"
                                    type="text"
                                    id="skills"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.skills}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 w-1/2">
                                <label htmlFor="qualification" className="text-xs">Qualification</label>
                                <select
                                    aria-label="qualification"
                                    id="qualification"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.qualification}
                                    onChange={handleChange}
                                >
                                    <option value="">Select qualification</option>
                                    <option value="metriculation">Metriculation</option>
                                    <option value="plus2">Plus2</option>
                                    <option value="degree">Degree or equivalent</option>
                                    <option value="postGraduation">Post Graduation</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-5">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="experience" className="text-xs">Years of experience</label>
                                <select
                                    aria-label="experience"
                                    id="experience"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.experience}
                                    onChange={handleChange}
                                >
                                    <option value="">Select experience</option>
                                    <option value="0-1 years">0-1 years</option>
                                    <option value="1-2 years">1-2 years</option>
                                    <option value="2-5 years">2-5 years</option>
                                    <option value="5+ years">5+ years</option>
                                </select>
                            </div>
                            <div className="mb-4 w-1/2">
                                <label htmlFor="skillLevel" className="text-xs">Skill level</label>
                                <select
                                    aria-label="skillLevel"
                                    id="skillLevel"
                                    className="text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] rounded-full"
                                    required
                                    value={formDataWorker.skillLevel}
                                    onChange={handleChange}
                                >
                                    <option value="">Select skill level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="professional">Professional</option>
                                    <option value="expert">Expert</option>
                                </select>
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

export default Form03;
