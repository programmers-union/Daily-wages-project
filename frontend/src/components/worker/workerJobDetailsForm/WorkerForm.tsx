// WorkerForm.tsx
import React, { useState } from 'react';
import Form01 from './Form01';
import Form02 from './Form02';
import Form03 from './Form03';
// import Form04 from './Form04';
import Form05 from './Form05';
import { WorkerProgressBar } from './WorkerProgressBar';
import { FormProgressProps } from '../../../types/AdminGategoryType';
import SignUp from '../../../auth/worker/WorkerSignUp';

const WorkerForm: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [activeAddCategoryPopup, setActiveAddCategoryPopup] = useState<boolean>(false);

    const steps = ["Form 01", "Form 02", "Form 03", "Form 04"];

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const formProps: FormProgressProps = {
        setActiveAddCategoryPopup,
        activeAddCategoryPopup,
        nextStep,
        prevStep
    };

    return (
        <div className='pt-8 overflow-hidden bg-custom-gradient'>
            <div className='w-1/2 m-auto px-4'>
                <WorkerProgressBar steps={steps} currentStep={step - 1} />
            </div>
            {step === 1 && <Form01 {...formProps} />}
            {step === 2 && <Form02 {...formProps} />}
            {step === 3 && <Form03 {...formProps} />}
            {/* {step === 4 && <Form04 {...formProps} />} */}
            {step === 4 && <Form05 {...formProps} />}
            {step === 5 && <SignUp />}
        </div>
    );
};

export default WorkerForm;
