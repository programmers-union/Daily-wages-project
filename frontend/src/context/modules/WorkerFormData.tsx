import React, { createContext, useState } from 'react';
import { ChildrenNode } from '../../types/authTypes/AuthTypes';
import axios from 'axios';
import { WorkerFormStateType, workerFormType } from '../../types/WorkerTypes';
import { useNavigate } from 'react-router-dom';

export const WorkerFormContext = createContext<WorkerFormStateType | null>(null);

export const WorkerFormProvider = ({ children }: ChildrenNode) => {
  const navigate = useNavigate();
  const [formDataWorker, setFormDataWorker] = useState<workerFormType>({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    password: '',
    phoneNumber: '',
    gender: '',
    address: '',
    selectState: '',
    selectDistrict: '',
    selectCity: '',
    pinCode: '',
    skills: '',
    qualification: '',
    experience: '',
    skillLevel: '',
    holderName: '',
    accoutNumber: '',
    bank: '',
    ifsc: '',
    branch: '',
    linkPhoneNumber: '',
    idProof: '',
    uniqueId: '',
    idProofFile: null as File | null,
  });

  const WorkerSignUp = async (data: workerFormType) => {
    try {
      const response = await axios.post('http://localhost:5000/api/client/worker-signUp', data);
      navigate('/otp');
      console.log('Worker process started', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Worker process failed:', error.response?.data?.message);
        throw error.response?.data?.message || 'Worker process failed';
      } else {
        console.error('An unexpected error occurred:', error);
        throw 'An unexpected error occurred';
      }
    }
  };

  return (
    <WorkerFormContext.Provider value={{ formDataWorker, setFormDataWorker, WorkerSignUp }}>
      {children}
    </WorkerFormContext.Provider>
  );
};

export default WorkerFormContext;
