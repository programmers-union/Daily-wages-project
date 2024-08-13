import mongoose,{Schema,Document} from "mongoose";

export interface ICategory extends Document {
    categoryName:string;
    imageUrl:string
}

const CategorySchema:Schema=new Schema({
    categoryName:{type:String,required:true},
    imageUrl:{type:String,required:true}

})

const Category=mongoose.model<ICategory>('category',CategorySchema);

export default Category;