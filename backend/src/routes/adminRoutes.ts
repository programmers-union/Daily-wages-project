import {Router} from 'express';
import { signupAdmin,loginAdmin,addCategoryData,addSubCategory,getCategories,getSubCategories,getClientsData,getEmployeesData} from '../controllers/adminController';
const adminRouter=Router();
import multer from 'multer';
const storage=multer.memoryStorage();
const upload=multer({storage:storage});

adminRouter.post('/signup',signupAdmin);
adminRouter.get('/login',loginAdmin);
adminRouter.post('/addCategory',upload.single('photo'),addCategoryData);
adminRouter.get('/getCategories',getCategories);
adminRouter.post('/addSubCategory',addSubCategory);
adminRouter.get('/getSubCategories',getSubCategories);
adminRouter.get('/getClients',getClientsData);
adminRouter.get('/getEmployees',getEmployeesData);



export default adminRouter;
