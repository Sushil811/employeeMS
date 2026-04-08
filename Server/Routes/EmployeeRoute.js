import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Employee from '../models/Employee.js';
import Category from '../models/Category.js';
import Leave from '../models/Leave.js';
import Attendance from '../models/Attendance.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Employee Register
router.post('/employee_register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ status: false, Error: 'All fields are required' });
        }

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.json({ status: false, Error: 'Employee already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Dynamically find or create a default category to satisfy the required category_id field
        let category = await Category.findOne();
        if (!category) {
            category = new Category({ name: 'General' });
            await category.save();
        }

        const newEmployee = new Employee({
            name,
            email,
            password: hashedPassword,
            address: 'Not provided',
            salary: 0,
            image: 'default-profile.png',
            category_id: category._id
        });

        await newEmployee.save();
        return res.json({ status: true, message: 'Employee registered successfully' });
    } catch (error) {
        console.error('Employee registration error:', error);
        return res.json({ status: false, Error: 'Registration failed: ' + error.message });
    }
});

// Employee Login
router.post('/employee_login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });
        
        if (employee) {
            const isPasswordValid = await bcrypt.compare(password, employee.password);
            if (isPasswordValid) {
                const token = jwt.sign({ 
                    email: employee.email, 
                    id: employee._id,
                    role: 'employee' 
                }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1d' });
                
                res.cookie('token', token, { httpOnly: true });
                return res.json({ status: true, id: employee._id, message: 'Login successful' });
            }
        }
        return res.json({ status: false, Error: 'Invalid credentials' });
    } catch (error) {
        console.error('Employee login error:', error);
        return res.json({ status: false, Error: 'Login failed' });
    }
});

// Employee Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true, message: 'Logged out successfully' });
});

// Get Employee Detail
router.get('/detail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id).populate('category_id');
        if (!employee) {
            return res.json({ status: false, Error: 'Employee not found' });
        }
        return res.json({ status: true, Result: [employee] });
    } catch (error) {
        console.error('Get employee detail error:', error);
        return res.json({ status: false, Error: 'Failed to fetch details' });
    }
});

// Apply Leave
router.post('/apply_leave', async (req, res) => {
    try {
        const { employee_id, leave_type, from_date, to_date, reason } = req.body;
        const newLeave = new Leave({
            employee_id,
            leave_type,
            from_date,
            to_date,
            reason
        });
        await newLeave.save();
        return res.json({ status: true, message: 'Leave applied successfully' });
    } catch (error) {
        console.error('Apply leave error:', error);
        return res.json({ status: false, Error: 'Failed to apply leave' });
    }
});

// Get Leave Status
router.get('/leave_status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const leaves = await Leave.find({ employee_id: id }).sort({ createdAt: -1 });
        return res.json({ status: true, Result: leaves });
    } catch (error) {
        console.error('Get leave status error:', error);
        return res.json({ status: false, Error: 'Failed to fetch leave status' });
    }
});

// Attendance - Check In
router.post('/check_in', async (req, res) => {
    try {
        const { employee_id } = req.body;
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const checkIn = now.toTimeString().split(' ')[0];

        const existingAttendance = await Attendance.findOne({ employee_id, date });
        if (existingAttendance) {
            return res.json({ status: false, Error: 'Already checked in for today' });
        }

        const newAttendance = new Attendance({
            employee_id,
            date,
            checkIn,
            status: 'Present'
        });

        await newAttendance.save();
        return res.json({ status: true, message: 'Checked in successfully' });
    } catch (error) {
        console.error('Check in error:', error);
        return res.json({ status: false, Error: 'Failed to check in' });
    }
});

// Attendance - Check Out
router.post('/check_out', async (req, res) => {
    try {
        const { employee_id } = req.body;
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const checkOut = now.toTimeString().split(' ')[0];

        const attendance = await Attendance.findOne({ employee_id, date });
        if (!attendance) {
            return res.json({ status: false, Error: 'No check-in record found for today' });
        }

        if (attendance.checkOut) {
            return res.json({ status: false, Error: 'Already checked out for today' });
        }

        // Calculate hours worked
        const checkInTime = new Date(`${date}T${attendance.checkIn}`);
        const checkOutTime = now;
        const diffInMs = checkOutTime - checkInTime;
        const hoursWorked = parseFloat((diffInMs / (1000 * 60 * 60)).toFixed(2));

        attendance.checkOut = checkOut;
        attendance.hoursWorked = hoursWorked;
        attendance.isGoalMet = hoursWorked >= 8;
        
        await attendance.save();
        return res.json({ 
            status: true, 
            message: `Checked out successfully. You worked ${hoursWorked} hours.`,
            hoursWorked,
            isGoalMet: attendance.isGoalMet
        });
    } catch (error) {
        console.error('Check out error:', error);
        return res.json({ status: false, Error: 'Failed to check out' });
    }
});

// Get Attendance Status
router.get('/attendance_status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const date = new Date().toISOString().split('T')[0];
        const attendance = await Attendance.findOne({ employee_id: id, date });
        return res.json({ status: true, Result: attendance });
    } catch (error) {
        console.error('Get attendance status error:', error);
        return res.json({ status: false, Error: 'Failed to fetch attendance status' });
    }
});

export { router as EmployeeRouter };