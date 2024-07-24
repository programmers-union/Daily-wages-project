import React from 'react';
import { ProgressBarProps } from '../../../types/WorkerTypes';

export const WorkerProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between">
                {steps.map(( _ , index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center border-2 
                                ${index < currentStep 
                                    ? 'bg-green-500 border-green-500 text-white' 
                                    : index === currentStep
                                        ? 'border-green-500 text-green-500'
                                        : 'border-gray-300 text-gray-300'
                                }`}>
                                {index < currentStep ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 ${index < currentStep ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};


