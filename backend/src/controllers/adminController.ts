import { Request, Response, NextFunction } from "express";
import Admin from "../models/Admin";
import Category from "../models/category";
import SubCategory from "../models/SubCategory"
import Client from "../models/Client";
import Employee from "../models/Employee";
import bcrypt from "bcryptjs";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const bucketName = 
// const bucketRegion = 
// const accessKey = 
// const secretKey = 
// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: accessKey,
//     secretAccessKey: secretKey,
//   },

//   region: bucketRegion,
// });


export const signupAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });
    const result = await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err: any) {
    next(err);
  }
};


export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ msg: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "invalid credentials" });
    }
    return res
      .status(200)
      .json({ msg: "Login Successfull", loginSuccess: true });
  } catch (error) {
    next(error);
  }
};


export const getCategories=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    const categories=await Category.find();
  if(!categories){
    return res.json({msg:"no categoriess found"});
  };
  // console.log(categories);
  return res.status(200).json({msg:"categories fetched successfully",categories:categories});
  } catch (error) {
    next(error);
  } 
};


export const getSubCategories=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    const {category}=req.body
    const subCategoryData=await SubCategory.find({Category:category});
    if(!subCategoryData){
      return res.status(404).json({msg:"no subCategory for this category"});
    }
    return res.status(200).json({msg:"sub category data fetched successfully",subCategoryData})
   
  } catch (error) {
    next(error)
  }
};


export const addCategoryData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryName,categoryIcon } = req.body;
  try {
    const category = await Category.findOne({ categoryName });
    if (category) {
      return res.status(409).json({ msg: "Category already exist" });
    }
    const newCategory = new Category({
      categoryName,
    });

    await newCategory.save();
    res.status(200).json({ msg: "category created successfully" });

  } catch (error) {
    next(error);
  }
};


export const addSubCategory=async (
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  const {name,category}=req.body;
  try {
    const subCategory=await SubCategory.find({name:name});
    if(subCategory){
      return res.json({msg:"already added"})
    };
    const newSubCategory=new SubCategory({
      name,
      category
    });
    await newSubCategory.save();
  } catch (error) {
    next(error);
  }
};


export const getClientsData=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    const clientsData=await Client.find({}, 'firstName email phoneNumber');
    console.log("clientsdata:",clientsData);
    if(!clientsData){
      return res.status(404).json({msg:"no clients found"});
    }
    
    return res.status(200).json({msg:"clientsData fetched successfully",clientsData});
  } catch (error) {
    next(error);
  }
};


export const getEmployeesData=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    const employeesData=await Employee.find({}, 'firstName email phoneNumber');
    console.log("EmployeesData:",employeesData);
    if(!employeesData){
      return res.status(404).json({msg:"no Empolyees found"})
    }
    return res.status(404).json({msg:"EmployeesData fetched successfully",employeesData});
  } catch (error) {
    next(error);
  }
};







































