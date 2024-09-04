import { Router } from "express";
import {
  signupAdmin,
  loginAdmin,
  getCategories,
  getSubCategories,
  getClientsData,
  getEmployeesData,
  addSubCategoryItems,
  getSubCategoryItems,
  getEmployeeData,
} from "../controllers/adminController";
const adminRouter = Router();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

adminRouter.post("/signup", signupAdmin);
adminRouter.get("/login", loginAdmin);

adminRouter.get("/get-main-categories", getCategories);
adminRouter.get("/get-sub-categories", getSubCategories);
adminRouter.post(
  "/add-sub-category-items",
  upload.single("image"),
  addSubCategoryItems
);
adminRouter.get('/get-sub-category-items',getSubCategoryItems);
adminRouter.get("/get-clients", getClientsData);
adminRouter.get("/get-employees", getEmployeesData);
adminRouter.get("/get-employee-data",getEmployeeData);

export default adminRouter;
