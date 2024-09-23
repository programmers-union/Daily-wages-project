import React, { useContext, useState } from 'react';
import { FormProgressProps } from "../../../types/AdminGategoryType";
import { WorkerFormStateType } from '../../../types/WorkerTypes';
import WorkerFormContext from '../../../context/modules/WorkerFormData';

const Form03: React.FC<FormProgressProps> = ({ nextStep, prevStep }) => {
    const { formDataWorker, setFormDataWorker } = useContext(WorkerFormContext) as WorkerFormStateType;
    
    const [skillsList, setSkillsList] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [errors, setErrors] = useState({
        qualification: '',
        experience: '',
        skillLevel: '',
    });

    const validate = () => {
        const newErrors = {
            qualification: formDataWorker.qualification.trim() === '' ? 'Qualification is required' : '',
            experience: formDataWorker.experience.trim() === '' ? 'Experience is required' : '',
            skillLevel: formDataWorker.skillLevel.trim() === '' ? 'Skill level is required' : '',
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSkillsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            setSkillsList([...skillsList, inputValue.trim()]);
            setFormDataWorker((prevState) => ({
                ...prevState,
                skills: [...skillsList, inputValue.trim()].join(', '),
            }));
            setInputValue(''); // Clear input after adding
        }
    };

    const removeSkill = (index: number) => {
        const updatedSkills = skillsList.filter((_, i) => i !== index);
        setSkillsList(updatedSkills);
        setFormDataWorker((prevState) => ({
            ...prevState,
            skills: updatedSkills.join(', '),
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            console.log(formDataWorker, '....formDataWorker....');
            nextStep();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex h-[80vh] w-[100vw] items-center">
                <div className="w-3/4 text-center">
                    <p className="text-[34px] w-3/4 ps-28 -mt-12">
                        Great.. How about adding some skills
                    </p>
                </div>
                <div className="flex w-1/2 justify-center items-center pe-8">
                    <div className="w-[40vw] me-10 relative">
                        {/* Custom text input area with tags inside */}
                        <div className="border-b border-gray-300 bg-transparent p-2 min-h-[100px] rounded-md text-xs flex flex-wrap items-center relative">
                            {skillsList.map((skill, index) => (
                                <div key={index} className="bg-blue-300  rounded-md px-2 py-0.5 flex items-center text-[10px] m-1">
                                    {skill}
                                    <button
                                        onClick={() => removeSkill(index)}
                                        className="ml-2 text-[8px] font-bold bg-gray-300 rounded-full w-3 h-3  flex items-center justify-center"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleSkillsKeyDown}
                                className="border-none bg-transparent outline-none flex-grow text-xs"
                                placeholder="Type a skill and press 'Enter'"
                            />
                        </div>

                        {/* Other form fields */}
                        <div className="flex space-x-5 mb-5 mt-6">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="qualification" className="text-xs">Qualification</label>
                                <select
                                    aria-label="qualification"
                                    id="qualification"
                                    className={`text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent ${errors.qualification ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formDataWorker.qualification}
                                    onChange={(e) => setFormDataWorker((prevState) => ({ ...prevState, qualification: e.target.value }))}
                                >
                                    <option value="">Select qualification</option>
                                    <option value="metriculation">Metriculation</option>
                                    <option value="plus2">Plus2</option>
                                    <option value="degree">Degree or equivalent</option>
                                    <option value="postGraduation">Post Graduation</option>
                                </select>
                                {errors.qualification && (
                                    <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>
                                )}
                            </div>

                            <div className="mb-4 w-1/2">
                                <label htmlFor="experience" className="text-xs">Years of experience</label>
                                <select
                                    aria-label="experience"
                                    id="experience"
                                    className={`text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formDataWorker.experience}
                                    onChange={(e) => setFormDataWorker((prevState) => ({ ...prevState, experience: e.target.value }))}
                                >
                                    <option value="">Select experience</option>
                                    <option value="0-1 years">0-1 years</option>
                                    <option value="1-2 years">1-2 years</option>
                                    <option value="2-5 years">2-5 years</option>
                                    <option value="5+ years">5+ years</option>
                                </select>
                                {errors.experience && (
                                    <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
                                )}
                            </div>
                            <div className="mb-4 w-1/2">
                                <label htmlFor="skillLevel" className="text-xs">Skill level</label>
                                <select
                                    aria-label="skillLevel"
                                    id="skillLevel"
                                    className={`text-xs mt-1 w-full border-b py-2 px-3 outline-none bg-[#f9f9fc] bg-transparent ${
                                        errors.skillLevel ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                    value={formDataWorker.skillLevel}
                                    onChange={(e) => setFormDataWorker((prevState) => ({ ...prevState, skillLevel: e.target.value }))}
                                >
                                    <option value="">Select skill level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="professional">Professional</option>
                                    <option value="expert">Expert</option>
                                </select>
                                {errors.skillLevel && <p className="text-red-500 text-xs mt-1">{errors.skillLevel}</p>}
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
