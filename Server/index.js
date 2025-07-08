import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import { adminRoute } from './Routes/AdminRoute.js';
import { EmployeeRouter } from './Routes/EmployeeRoute.js';
import path from 'path';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', adminRoute)
app.use('/employee', EmployeeRouter);
app.use('/Images', express.static(path.join(process.cwd(), 'Public/Images')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});