import express from "express";
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import { config } from "dotenv";
import { errorMiddelware } from "./middleware/error.js";
import cors from 'cors';

export const app = express();
config({
    path:'./data/config.env'
});

// MiddelWares
// app.use(express.urlencoded({extended:true}));
app.use(cookieParser());    
app.use(express.json());

app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods:["GET","PUT","DELETE","POST"],
    credentials:true,   // For Passing COOKIES to Frontend
}));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/task',taskRouter);

// Error Handler
app.use(errorMiddelware)
