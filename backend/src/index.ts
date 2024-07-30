import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import connectDB from './utils/db';
import dotenv from 'dotenv';
import cors from 'cors';
import clientRoutes from './routes/clientRoutes';
import adminRoutes from './routes/adminRoutes';
import employeeRoutes from './routes/employeeRoutes';
import authRoutes from './routes/authRoutes';
import './config/googleAuthConfig';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

connectDB();

app.use(
    session({
        secret: 'hallo world' as string, 
        resave: false,
        saveUninitialized: false,
    })
);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

// app.use('/api/admin/some',(req,res)=>{
// console.log(req.body)
// })


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
