export interface ClientAddFormData {
    jobTitle: string;
    time: string;
    location: string;
    description: string;
  }
  
  export interface PropsData {
    setIsActive: (active: boolean) => void;
    calendarDate:string 
  }
  
  export interface ClientForm {
    ClientCalendarAddForm: (formDataAdmin: ClientAddFormData) => Promise<void>;
  }
  