import mongoose,{Schema,Document} from "mongoose";
import { IUser } from "./Client";



export interface IEmployee extends IUser {
    firstName: string;
    lastName: string;
    password: string;
    isVerified: boolean;
}

const EmployeeSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    otp:{type:String},
    otpExpiry:{type:Date},
    isVerified:{type:Boolean}
});

const Employee=mongoose.model<IEmployee>('Employee',EmployeeSchema);

export default Employee;