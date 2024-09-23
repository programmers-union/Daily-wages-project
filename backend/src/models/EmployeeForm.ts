import mongoose, { Document, Schema } from "mongoose";
import { StepInstance } from "twilio/lib/rest/studio/v1/flow/engagement/step";

export interface IEmployeeForm extends Document {
  dob: string;
  gender: string;
  address: string;
  selectState: string;
  selectDistrict: string;
  selectCity: string;
  pinCode: number;
  skills: string;
  qualification: string;
  experience: string;
  skillLevel: string;
  email:string;
  // holderName: string;
  // accoutNumber: string;
  // bank: string;
  // ifsc: string;
  // branch: string;
  // linkPhoneNumber: string;
  idProof: string;
  uniqueId: string;
//   idProofFile?: string;
}

const EmployeeFormSchema: Schema = new Schema({
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  selectState: { type: String, required: true },
  selectDistrict: { type: String, required: true },
  selectCity: { type: String, required: true },
  pinCode: { type: Number, required: true },
  skills: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  skillLevel: { type: String, required: true },
  email: { type: String, required: true },
  // holderName: { type: String, required: true },
  // accoutNumber: { type: String, required: true },
  // bank: { type: String, required: true },
  // ifsc: { type: String, requird: true },
  // branch: { type: String, required: true },
  // linkPhoneNumber: { type: String, required: true },
  idProof: { type: String, required: true },
  uniqueId: { type: String, required: true },
  // idProofFile: { type: String, required: true },
  // profilePic: { type: String, required: true },
});

const EmployeeForm = mongoose.model<IEmployeeForm>(
  "EmployeeForm",
  EmployeeFormSchema
);

export default EmployeeForm;
