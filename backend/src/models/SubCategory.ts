import mongoose,{Schema,Document} from "mongoose";

export interface ISubCategory extends Document{
    name:string;
    mainCategoryId:mongoose.Schema.Types.ObjectId;
    iconUrl:string;
    
}

const SubCategorySchema:Schema=new Schema({
    name:{type:String,required:true},
    mainCategoryId:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true},
    iconUrl:{type:String,required:true},
      
    
})

const SubCategory=mongoose.model<ISubCategory>('SubCategory',SubCategorySchema);

export default SubCategory;