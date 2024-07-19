import mongoose,{Schema,Document, mongo} from "mongoose";
import Category from "./category";

export interface ISubCategory extends Document{
    name:string,
    category:mongoose.Schema.Types.ObjectId;
}

const SubCategorySchema:Schema=new Schema({
    name:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true}
})

const SubCategory=mongoose.model<ISubCategory>('SubCategory',SubCategorySchema);

export default SubCategory;