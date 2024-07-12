import express,{Request,Response,NextFunction} from 'express';
import connectDB from './utils/db';
import dotenv from 'dotenv';
import cors from 'cors';
import clientRoutes from './routes/clientRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/client',clientRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
