import { createContext, useState } from "react";
import { ChildrenNode } from "../../types/authTypes/AuthTypes";
import axios from "axios";
import { WorkerFormStateType, workerFormType } from "../../types/WorkerTypes";
import { useNavigate } from "react-router-dom";

export const WorkerFormContext = createContext<WorkerFormStateType | null>(
  null
);

export const WorkerFormProvider = ({ children }: ChildrenNode) => {
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState<string>('')
  const [formDataWorker, setFormDataWorker] = useState<workerFormType>({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    password: "",
    phoneNumber: "",
    gender: "",
    address: "",
    selectState: "",
    selectDistrict: "",
    selectCity: "",
    pinCode: "",
    skills: "",
    qualification: "",
    experience: "",
    skillLevel: "",

    idProof: "",
    uniqueId: "",
    // idProofFile: null,
    // profilePic: null,
  });
const [loginError , setLoginError] = useState<string>('')

  const WorkerSignUp = async (formData: workerFormType) => {
    try {
   
  console.log(formData,'this is sform data')
      const response = await axios.post(
        "http://localhost:5000/api/employee/worker-signUp",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSignupSuccess('signUp Successfully')
        navigate("/otp");
  
      console.log("Worker process started", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoginError(error.response?.data?.msg)
        console.error("Worker process failed:", error.response?.data?.message);
        throw error.response?.data?.message || "Worker process failed";
      } else {
        console.error("An unexpected error occurred:", error);
        throw "An unexpected error occurred";
      }
    }
  };
  
  return (
    <WorkerFormContext.Provider
      value={{ formDataWorker, setFormDataWorker, WorkerSignUp ,loginError ,signupSuccess }}
    >
      {children}
    </WorkerFormContext.Provider>
  );
};

export default WorkerFormContext;
