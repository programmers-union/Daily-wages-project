export interface WorkerLoginSecFourProps {
    prevStep?: (() => void) | undefined
    nextStep: (() => void) | undefined
  }
  
  export interface ProgressBarProps {
    steps: string[];
    currentStep: number;
  }
  
  export interface workerFormType {
    firstName: string;
    lastName: string;
    email: string;
    dob: string; 
    password: string;
    phoneNumber: string; 
    gender: string;
    address: string;
    selectState: string;
    selectDistrict: string;
    selectCity: string;
    pinCode: string; 
    skills: string;
    qualification: string;
    experience: string; 
    skillLevel: string;
    // holderName: string;
    // accoutNumber: string; 
    // bank: string;
    // ifsc: string; 
    // branch: string;
    // linkPhoneNumber: string; 
    idProof: string;
    uniqueId: string; 
    // idProofFile: File | null;
    // profilePic: File | null;
  }
  
  export interface WorkerFormStateType {
    formDataWorker: workerFormType;
    setFormDataWorker: React.Dispatch<React.SetStateAction<workerFormType>>;
    WorkerSignUp:(formDataWorker:workerFormType) => Promise<void>;
    loginError:string;
    signupSuccess:string;
  }
  