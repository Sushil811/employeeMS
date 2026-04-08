import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import Admin from '../models/Admin.js';
import Category from '../models/Category.js';
import Employee from '../models/Employee.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import Leave from '../models/Leave.js';

dotenv.config();

const router = express.Router();

// Ensure upload directory exists
const uploadDir = 'Public/Images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Admin Register
router.post('/admin_register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ status: false, Error: 'Email and password are required' });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.json({ status: false, Error: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        return res.json({ status: true, message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return res.json({ status: false, Error: 'Registration failed' });
    }
});

// Admin Login
router.post('/admin_login', async (req, res) => {
    try {
        console.log('=== ADMIN LOGIN REQUEST START ===');
        console.log('Request body:', req.body);
        
        const { email, password } = req.body;
        
        if (!email || !password) {
            console.log('❌ Missing email or password');
            return res.json({ status: false, Error: 'Email and password are required' });
        }
        
        console.log('🔍 Looking for admin with email:', email);
        const admin = await Admin.findOne({ email });
        
        if (admin) {
            console.log('✅ Admin found, checking password...');
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (isPasswordValid) {
                console.log('✅ Password is valid, creating token...');
                const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true });
                console.log('✅ Login successful, token created');
                console.log('=== ADMIN LOGIN REQUEST END ===');
                return res.json({ status: true, message: 'Login successful' });
            } else {
                console.log('❌ Invalid password');
            }
        } else {
            console.log('❌ Admin not found');
        }
        
        console.log('❌ Login failed - invalid credentials');
        console.log('=== ADMIN LOGIN REQUEST END ===');
        return res.json({ status: false, Error: 'Invalid credentials' });
    } catch (error) {
        console.log('=== ADMIN LOGIN ERROR ===');
        console.error('Error type:', error.constructor.name);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        return res.json({ status: false, Error: 'Login failed' });
    }
});

// Admin Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true, message: 'Logged out successfully' });
});

// Get Categories
router.get('/category', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.json({ status: true, Result: categories });
    } catch (error) {
        console.error('Get categories error:', error);
        return res.json({ status: false, Error: 'Database query error' });
    }
});

// Add Category
router.post('/add_category', async (req, res) => {
    try {
        console.log('=== ADD CATEGORY REQUEST START ===');
        console.log('Request body:', req.body);
        console.log('Request headers:', req.headers);
        
        const { category } = req.body;

        if (!category || category.trim() === '') {
            console.log('❌ Category validation failed: empty or missing category');
            return res.json({ status: false, Error: 'Category name is required' });
        }

        console.log('✅ Category validation passed:', category);

        // Check database connection
        const dbState = mongoose.connection.readyState;
        console.log('Database connection state:', dbState);
        
        if (dbState !== 1) {
            console.log('❌ Database not connected. State:', dbState);
            return res.json({ status: false, Error: 'Database not connected' });
        }

        // Check if category already exists (case insensitive)
        console.log('🔍 Checking for existing category...');
        const existingCategory = await Category.findOne({ 
            name: { $regex: new RegExp(`^${category.trim()}$`, 'i') }
        });
        
        if (existingCategory) {
            console.log('❌ Category already exists:', existingCategory);
            return res.json({ status: false, Error: 'Category already exists' });
        }

        console.log('✅ No existing category found');

        // Create new category
        console.log('📝 Creating new category object...');
        const newCategory = new Category({ 
            name: category.trim().toLowerCase() 
        });
        
        console.log('Category object created:', newCategory);
        
        console.log('💾 Attempting to save category...');
        const savedCategory = await newCategory.save();
        
        console.log('✅ Category saved successfully:', savedCategory);
        console.log('=== ADD CATEGORY REQUEST END ===');
        
        return res.json({ 
            status: true, 
            message: 'Category added successfully', 
            category: savedCategory 
        });
        
    } catch (error) {
        console.log('=== ADD CATEGORY ERROR ===');
        console.error('Error type:', error.constructor.name);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error stack:', error.stack);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            console.log('❌ Duplicate key error');
            return res.json({ status: false, Error: 'Category already exists' });
        }
        
        if (error.name === 'ValidationError') {
            console.log('❌ Validation error');
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.json({ 
                status: false, 
                Error: 'Validation error: ' + validationErrors.join(', ') 
            });
        }
        
        if (error.name === 'MongoServerError') {
            console.log('❌ MongoDB server error');
            return res.json({ 
                status: false, 
                Error: 'Database error: ' + error.message 
            });
        }
        
        if (error.name === 'MongooseError') {
            console.log('❌ Mongoose error');
            return res.json({ 
                status: false, 
                Error: 'Mongoose error: ' + error.message 
            });
        }
        
        console.log('❌ Generic error');
        return res.json({ 
            status: false, 
            Error: 'Failed to add category: ' + error.message 
        });
    }
});

// Image Upload Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('📁 File upload attempt:', file.originalname, 'Type:', file.mimetype);
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            console.log('❌ Invalid file type:', file.mimetype);
            return cb(new Error('Only .jpg and .png files are allowed'));
        }
        console.log('✅ File type accepted');
        cb(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// Add Employee
router.post('/add_employee', upload.single('image'), async (req, res) => {
    try {
            console.log('=== ADD EMPLOYEE REQUEST START ===');
            console.log('Request body:', req.body);
            console.log('Request file:', req.file);
            
            const { name, email, password, address, salary, category_id } = req.body;

            if (!name || !email || !password || !address || !salary || !category_id || !req.file) {
                console.log('❌ Missing required fields');
                console.log('Name:', !!name, 'Email:', !!email, 'Password:', !!password, 'Address:', !!address, 'Salary:', !!salary, 'Category:', !!category_id, 'File:', !!req.file);
                return res.json({ status: false, Error: 'All fields, including an image, are required' });
            }

            console.log('✅ All required fields present');

            // Check if category exists
            console.log('🔍 Checking category:', category_id);
            const category = await Category.findById(category_id);
            if (!category) {
                console.log('❌ Category not found');
                return res.json({ status: false, Error: 'Invalid category' });
            }
            console.log('✅ Category found:', category.name);

            // Check if email already exists
            console.log('🔍 Checking for existing email:', email);
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) {
                console.log('❌ Email already exists');
                return res.json({ status: false, Error: 'Email already exists' });
            }
            console.log('✅ Email is unique');

            // Hash the password
            console.log('🔐 Hashing password...');
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('✅ Password hashed');

            console.log('📝 Creating employee object...');
            const newEmployee = new Employee({
                name,
                email,
                password: hashedPassword,
                address,
                salary: Number(salary),
                image: req.file.filename,
                category_id
            });
            
            console.log('Employee object created:', newEmployee);

            console.log('💾 Saving employee...');
            const savedEmployee = await newEmployee.save();
            console.log('✅ Employee saved successfully:', savedEmployee);
            console.log('=== ADD EMPLOYEE REQUEST END ===');
            
            return res.json({ status: true, message: 'Employee added successfully', employee: savedEmployee });
        } catch (error) {
            console.log('=== ADD EMPLOYEE ERROR ===');
            console.error('Error type:', error.constructor.name);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error code:', error.code);
            console.error('Error stack:', error.stack);
            
            // Handle specific MongoDB errors
            if (error.code === 11000) {
                console.log('❌ Duplicate key error');
                return res.json({ status: false, Error: 'Email already exists' });
            }
            
            if (error.name === 'ValidationError') {
                console.log('❌ Validation error');
                const validationErrors = Object.values(error.errors).map(err => err.message);
                return res.json({ 
                    status: false, 
                    Error: 'Validation error: ' + validationErrors.join(', ') 
                });
            }
            
            if (error.name === 'MongoServerError') {
                console.log('❌ MongoDB server error');
                return res.json({ 
                    status: false, 
                    Error: 'Database error: ' + error.message 
                });
            }
            
            if (error.name === 'MongooseError') {
                console.log('❌ Mongoose error');
                return res.json({ 
                    status: false, 
                    Error: 'Mongoose error: ' + error.message 
                });
            }
            
            console.log('❌ Generic error');
            return res.json({ 
                status: false, 
                Error: 'Failed to add employee: ' + error.message 
            });
        }
    });

// Get Employees
router.get('/employee', async (req, res) => {
    try {
        const employees = await Employee.find().populate('category_id', 'name');
        return res.json({ status: true, Result: employees });
    } catch (error) {
        console.error('Get employees error:', error);
        return res.json({ status: false, Error: "Query Error: " + error.message });
    }
});

// Get Employee by ID
router.get('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id).populate('category_id', 'name');
        
        if (!employee) {
            return res.json({ status: false, Error: 'Employee not found' });
        }
        
        return res.json({ status: true, Result: [employee] });
    } catch (error) {
        console.error('Get employee error:', error);
        return res.json({ status: false, Error: 'Failed to get employee' });
    }
});

// Update Employee
router.put('/update_employee/:id', upload.single('image'), async (req, res) => {
    try {
        console.log('=== UPDATE EMPLOYEE REQUEST START ===');
        console.log('Employee ID:', req.params.id);
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        
        const { id } = req.params;
        const { name, email, address, salary, category_id } = req.body;

        if (!name || !email || !address || !salary || !category_id) {
            console.log('❌ Missing required fields');
            return res.json({ status: false, Error: 'All fields are required' });
        }

        console.log('✅ All required fields present');

        // Check if category exists
        console.log('🔍 Checking category:', category_id);
        const category = await Category.findById(category_id);
        if (!category) {
            console.log('❌ Category not found');
            return res.json({ status: false, Error: 'Invalid category' });
        }
        console.log('✅ Category found:', category.name);

        const updateData = { name, email, address, salary: Number(salary), category_id };
        
        if (req.file) {
            updateData.image = req.file.filename;
            console.log('📁 New image uploaded:', req.file.filename);
        }

        console.log('📝 Updating employee with data:', updateData);
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedEmployee) {
            console.log('❌ Employee not found');
            return res.json({ status: false, Error: 'Employee not found' });
        }

        console.log('✅ Employee updated successfully:', updatedEmployee);
        console.log('=== UPDATE EMPLOYEE REQUEST END ===');
        return res.json({ status: true, message: 'Employee updated successfully' });
    } catch (error) {
        console.log('=== UPDATE EMPLOYEE ERROR ===');
        console.error('Error type:', error.constructor.name);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error stack:', error.stack);
        
        if (error.name === 'ValidationError') {
            console.log('❌ Validation error');
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.json({ 
                status: false, 
                Error: 'Validation error: ' + validationErrors.join(', ') 
            });
        }
        
        if (error.name === 'CastError') {
            console.log('❌ Cast error - invalid ObjectId');
            return res.json({ 
                status: false, 
                Error: 'Invalid employee ID format' 
            });
        }
        
        console.log('❌ Generic error');
        return res.json({ 
            status: false, 
            Error: 'Failed to update employee: ' + error.message 
        });
    }
});

// Delete Employee
router.delete('/delete_employee/:id', async (req, res) => {
    try {
        console.log('=== DELETE EMPLOYEE REQUEST START ===');
        console.log('Employee ID:', req.params.id);
        
        const { id } = req.params;
        
        // Validate ObjectId format
        if (!id || id.length !== 24) {
            console.log('❌ Invalid ObjectId format');
            return res.json({ status: false, Error: 'Invalid employee ID format' });
        }
        
        console.log('🔍 Looking for employee with ID:', id);
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        
        if (!deletedEmployee) {
            console.log('❌ Employee not found');
            return res.json({ status: false, Error: 'Employee not found' });
        }
        
        console.log('✅ Employee deleted successfully:', deletedEmployee.name);
        console.log('=== DELETE EMPLOYEE REQUEST END ===');
        return res.json({ status: true, message: 'Employee deleted successfully' });
    } catch (error) {
        console.log('=== DELETE EMPLOYEE ERROR ===');
        console.error('Error type:', error.constructor.name);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error stack:', error.stack);
        
        if (error.name === 'CastError') {
            console.log('❌ Cast error - invalid ObjectId');
            return res.json({ 
                status: false, 
                Error: 'Invalid employee ID format' 
            });
        }
        
        console.log('❌ Generic error');
        return res.json({ 
            status: false, 
            Error: 'Failed to delete employee: ' + error.message 
        });
    }
});

// Admin Count
router.get('/admin_count', async (req, res) => {
    try {
        console.log('=== ADMIN COUNT REQUEST ===');
        const count = await Admin.countDocuments();
        console.log('✅ Admin count:', count);
        return res.json({ status: true, Result: [{ admin: count }] });
    } catch (error) {
        console.error('Admin count error:', error);
        return res.json({ status: false, Error: 'Failed to get admin count' });
    }
});

// Employee Count
router.get('/employee_count', async (req, res) => {
    try {
        console.log('=== EMPLOYEE COUNT REQUEST ===');
        const count = await Employee.countDocuments();
        console.log('✅ Employee count:', count);
        return res.json({ status: true, Result: [{ employee: count }] });
    } catch (error) {
        console.error('Employee count error:', error);
        return res.json({ status: false, Error: 'Failed to get employee count' });
    }
});

// Salary Count (Total salary)
router.get('/salary_count', async (req, res) => {
    try {
        console.log('=== SALARY COUNT REQUEST ===');
        const result = await Employee.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalary: { $sum: '$salary' }
                }
            }
        ]);
        const totalSalary = result.length > 0 ? result[0].totalSalary : 0;
        console.log('✅ Total salary:', totalSalary);
        return res.json({ status: true, Result: [{ salary: totalSalary }] });
    } catch (error) {
        console.error('Salary count error:', error);
        return res.json({ status: false, Error: 'Failed to get salary count' });
    }
});

// Admin Records
router.get('/admin_records', async (req, res) => {
    try {
        console.log('=== ADMIN RECORDS REQUEST ===');
        const admins = await Admin.find({}, { password: 0 }); // Exclude password
        console.log('✅ Admin records found:', admins.length);
        return res.json({ status: true, Result: admins });
    } catch (error) {
        console.error('Admin records error:', error);
        return res.json({ status: false, Error: 'Failed to get admin records' });
    }
});


router.get('/leaves', async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employee_id', 'name email').sort({ createdAt: -1 });
        return res.json({ status: true, Result: leaves });
    } catch (error) {
        console.error('Get leaves error:', error);
        return res.json({ status: false, Error: 'Failed to fetch leaves' });
    }
});

// Update Leave Status
router.post('/update_leave_status', async (req, res) => {
    try {
        const { id, status } = req.body;
        await Leave.findByIdAndUpdate(id, { status });
        return res.json({ status: true, message: 'Leave status updated' });
    } catch (error) {
        console.error('Update leave status error:', error);
        return res.json({ status: false, Error: 'Failed to update leave status' });
    }
});

export { router as adminRoute };
