import mongoose,{Schema,Document} from "mongoose"


export interface ISubCategoryItems extends Document{
    jobTitle:string;
    subCategoryId:mongoose.Schema.Types.ObjectId;
    date:Date;
    description:string

}


const SubCategoryItemsSchema= new Schema({
    jobTitle:{type:String,required:true},
    subCategoryId:{type:mongoose.Schema.Types.ObjectId,ref:'SubCategory',required:true},
    date:{type:Date,required:true},
    description:{type:String,required:true}

})

const SubCategoryItem=mongoose.model<ISubCategoryItems>('SubCategoryItem',SubCategoryItemsSchema);
export default SubCategoryItem;