import React, { createContext, useState } from 'react';
import { ChildrenNode } from '../../types/authTypes/AuthTypes';
import axios from 'axios';
import { WorkerFormStateType, workerFormType } from '../../types/WorkerTypes';
import { useNavigate } from 'react-router-dom';

export const WorkerFormContext = createContext<WorkerFormStateType | null>(null);

export const WorkerFormProvider = ({ children }: ChildrenNode) => {
  const navigate = useNavigate();
  const [formDataWorker, setFormDataWorker] = useState<workerFormType>({
    firstName: '',     lastName: '',     email: '',     dob: '',     password: '',     phoneNumber: '',     gender: '',     address: '',     selectState: '',     selectDistrict: '',     selectCity: '',     pinCode: '',     skills: '',     qualification: '',     experience: '',     skillLevel: '',     holderName: '',     accoutNumber: '',     bank: '',     ifsc: '',     branch: '',     linkPhoneNumber: '',     idProof: '',     uniqueId: '',     idProofFile: null as File | null,     profilePic: null as File | null,  
  });

  const WorkerSignUp = async (data: workerFormType) => {
    console.log(data, 'data is');
    try {
      const formData = new FormData();
      
      // Append all non-file fields
      Object.keys(data).forEach(key => {
        if (key !== 'idProofFile' && key !== 'profilePic') {
          formData.append(key, data[key]);
        }
      });

      // Append file fields
      if (data.idProofFile) formData.append('idProofFile', data.idProofFile);
      if (data.profilePic) formData.append('profilePic', data.profilePic);

      const response = await axios.post('http://localhost:5000/api/employee/worker-signUp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Worker process started', response.data);
      navigate('/otp');
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