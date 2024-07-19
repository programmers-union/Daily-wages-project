import mongoose,{Schema,Document} from "mongoose";

export interface IEmployee extends Document {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    phoneNumber:string,
    otp?:string,
    otpExpiry:Date,
    isVerified:Boolean
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

