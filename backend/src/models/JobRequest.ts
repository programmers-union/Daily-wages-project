import mongoose,{Schema,Document} from "mongoose";
import SubCategoryItem from "./SubCategoryItems";

export interface IjobRequst extends Document{
    jobToDo:mongoose.Schema.Types.ObjectId;
    date:Date,
    time:string,
    description:string,
    location:string,

}

const JobRequestSchema:Schema=new Schema({
    jobTitle:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:SubCategoryItem
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
});

const JobRequest=mongoose.model<IjobRequst>('JobRequest',JobRequestSchema);
export default JobRequest;