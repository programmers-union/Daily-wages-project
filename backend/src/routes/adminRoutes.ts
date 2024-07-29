import {Router} from 'express';
import { signupAdmin,loginAdmin,addCategoryData,addSubCategory,getCategories,getSubCategories,getClientsData,getEmployeesData} from '../controllers/adminController';
const adminRouter=Router();
import multer from 'multer';
const storage=multer.memoryStorage();
const upload=multer({storage:storage});

adminRouter.post('/signup',signupAdmin);
adminRouter.get('/login',loginAdmin);
// adminRouter.post('/add-category',upload.single('photo'),addCategoryData);
adminRouter.get('/get-main-categories',getCategories);
adminRouter.post('/add-sub-category',upload.single('photo'),addSubCategory);
adminRouter.get('/get-sub-categories',getSubCategories);
// adminRouter.get('/add-sub-category-items',addSubCategoryItems);
adminRouter.get('/get-clients',getClientsData);
adminRouter.get('/get-employees',getEmployeesData);




export default adminRouter;