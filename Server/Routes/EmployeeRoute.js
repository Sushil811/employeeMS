import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Employee from '../models/Employee.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Employee Login
router.post('/employee_login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });
        
        if (employee) {
            const isPasswordValid = await bcrypt.compare(password, employee.password);
            if (isPasswordValid) {
                const token = jwt.sign({ email: employee.email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true });
                return res.json({ status: true, message: 'Login successful' });
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

// Get Employee Profile
router.get('/profile', async (req, res) => {
    try {
        // This would typically get the employee from the JWT token
        // For now, we'll return a placeholder
        return res.json({ status: true, message: 'Profile endpoint' });
    } catch (error) {
        console.error('Get profile error:', error);
        return res.json({ status: false, Error: 'Failed to get profile' });
    }
});

export { router as EmployeeRouter };