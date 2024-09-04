import mongoose, { Schema, Document } from 'mongoose';


export interface IUser extends Document {
    email?: string;
    phoneNumber?: string;
    otp?: string;
    otpExpiry?: Date;
    password?:string
    refreshToken?:string
  }


export interface IClient extends IUser {
    firstName: string;
    lastName: string;
    password: string;
    isVerified:Boolean;
    refreshToken:string;
}

const ClientSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    otp:{type:String},
    otpExpiry:{type:Date},
    isVerified:{type:Boolean},
    refreshToken:String
});

const Client = mongoose.model<IClient>('Client', ClientSchema);

export default Client;