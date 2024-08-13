import { Request, Response, NextFunction } from "express";
import Admin from "../models/Admin";
import Category from "../models/category";
import SubCategory from "../models/SubCategory";
import Client from "../models/Client";
import Employee from "../models/Employee";
import bcrypt from "bcryptjs";
import uploadIcon from "../config/cloudinaryConfig";
import SubCategoryItem from "../models/SubCategoryItems";


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

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.json({ msg: "no categoriess found" });
    }
    // console.log(categories);
    return res
      .status(200)
      .json({ msg: "categories fetched successfully", categories: categories });
  } catch (error) {
    next(error);
  }
};

export const getSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCategories = await SubCategory.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "mainCategoryId",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $group: {
          _id: "$categoryDetails._id",
          categoryName: { $first: "$categoryDetails.categoryName" },
          subCategories: {
            $push: {
              subCategoryId: "$_id",
              name: "$name",
              iconUrl: "$iconUrl",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          categoryId: "$_id",
          categoryName: 1,
          subCategories: 1,
        },
      },
    ]);

    const result = subCategories.reduce((acc, item) => {
      acc[item.categoryId] = item.subCategories;
      return acc;
    }, {});
    console.log("resulttttttttttt:", result);
    res.status(200).json([result]);
  } catch (error) {
    next(error);
  }
};

export const addSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, mainCategoryId } = req.body;
  const file = req.file;
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const formattedDate = `${mm}-${dd}-${yyyy}`;
  try {
    const subCategory = await SubCategory.findOne({ name: name });
    console.log("subCategory:", subCategory);
    if (subCategory) {
      return res.json({ msg: "already added" });
    }

    let iconUrl = "";

    if (file) {
      iconUrl = await uploadIcon(file.buffer);
      console.log("iconUrl:", iconUrl);
    }

    const newSubCategory = new SubCategory({
      name,
      mainCategoryId,
      iconUrl: iconUrl,
      date: formattedDate,
    });
    console.log("newSubCategory:", newSubCategory);

    await newSubCategory.save();
    console.log("three");
    res.status(201).json({ msg: "Sub-category added successfully" });
  } catch (error) {
    next(error);
  }
};

export const getClientsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientsData = await Client.find({}, "firstName email phoneNumber");
    console.log("clientsdata:", clientsData);
    if (!clientsData) {
      return res.status(404).json({ msg: "no clients found" });
    }

    return res
      .status(200)
      .json({ msg: "clientsData fetched successfully", clientsData });
  } catch (error) {
    next(error);
  }
};

export const getEmployeesData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employeesData = await Employee.find(
      {},
      "firstName email phoneNumber"
    );
    console.log("EmployeesData:", employeesData);
    if (!employeesData) {
      return res.status(404).json({ msg: "no Empolyees found" });
    }
    return res
      .status(200)
      .json({ msg: "EmployeesData fetched successfully", employeesData });
  } catch (error) {
    next(error);
  }
};

export const addSubCategoryItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      image,
      subCategory,
      newSubCategory,
      jobTitle,
      description,
      mainCategoryId,
    } = req.body;
    const file = req.file;
    let subCategoryId = null;
    let iconUrl = null;
    if (newSubCategory) {
      const existingSubCat = await SubCategory.findOne({
        name: newSubCategory,
      });
      if (existingSubCat) {
        return res.status(400).json({ message: "Subcategory already exists" });
      }
      if (file) {
        iconUrl = await uploadIcon(file.buffer);
      }
      const newSubCat = new SubCategory({
        name: newSubCategory,
        mainCategoryId: mainCategoryId,
        iconUrl: iconUrl,
      });
      const savedSubCat = await newSubCat.save();
      subCategoryId = savedSubCat._id;
    } else {
      const existingSubCat = await SubCategory.findOne({
        name: subCategory,
        mainCategoryId,
      });
      if (!existingSubCat) {
        return res.status(400).json({ message: "Subcategory not found" });
      }
      subCategoryId = existingSubCat._id;
    }
    const date = new Date();

    const newSubCategoryItem = new SubCategoryItem({
      jobTitle,
      subCategoryId,
      date,
      description: description,
    });
    await newSubCategoryItem.save();
    res.status(201).json({ message: "Sub-category item added successfully" });
  } catch (error) {
    next(error);
  }
};

export const getSubCategoryItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCategoryItems = await SubCategoryItem.find().populate(
      "subCategoryId",
      "name"
    );
    if (!subCategoryItems || subCategoryItems.length === 0) {
      return res.status(404).json({ msg: "No subcategory data found" });
    }
    return res.status(200).json({
      msg: "Subcategory items fetched successfully",
      subCategoryItems,
    });
  } catch (error) {
    next(error);
  }
};

// export const getNewJobRequest = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};