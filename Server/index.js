import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import { adminRoute } from './Routes/AdminRoute.js';
import { EmployeeRouter } from './Routes/EmployeeRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', adminRoute)
app.use('/employee', EmployeeRouter);
app.use('/Images', express.static(path.join(__dirname, 'Public/Images')));

// Static Files for Frontend (Production)
const frontendPath = path.join(__dirname, '../EmployeeMS/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
    if (!req.path.startsWith('/auth') && !req.path.startsWith('/employee') && !req.path.startsWith('/Images')) {
        res.sendFile(path.join(frontendPath, 'index.html'));
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});