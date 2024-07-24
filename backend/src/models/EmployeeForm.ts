import mongoose,{Document,Schema} from "mongoose";
import { StepInstance } from "twilio/lib/rest/studio/v1/flow/engagement/step";

export interface IEmployeeForm extends Document{
    dob:string,
    gender:string,
    address:string,
    state:string,
    district:string,
    city:string,
    pinCode:number,
    skills:string,
    qualification:string,
    experience:string,
    skillLevel:string,
    holderName:string,
    accountNumber:number,
    bank:string,
    ifsc:string,
    branch:string,
    linkedPhoneNumber:string,
    idProof:string,
    uniqueId:string,
    idProofFile:string

}


const EmployeeFormSchema:Schema=new Schema({
    dob:{type:String,required:true},
    gender:{type:String,required:true},
    address:{type:String,required:true},
    state:{type:String,required:true},
    district:{type:String,required:true},
    city:{type:String,required:true},
    pinCode:{type:Number,required:true},
    skills:{type:String,required:true},
    qualification:{type:String,required:true},
    experience:{type:String,required:true},
    skillLevel:{type:String,required:true},
    holderName:{type:String,required:true},
    accountNumber:{type:Number,required:true},
    bank:{type:String,required:true},
    ifsc:{type:String,requird:true},
    branch:{type:String,required:true},
    linkedPhoneNumber:{type:String,required:true},
    idProof:{type:String,required:true},
    uniqueId:{type:String,required:true},
    idProofFile:{type:String,required:true},
});

const EmployeeForm=mongoose.model<IEmployeeForm>('EmployeeForm',EmployeeFormSchema);

export default EmployeeForm;

