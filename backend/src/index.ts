import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('port is running successfully!');
});
