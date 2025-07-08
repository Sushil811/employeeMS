import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employeems';

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create default admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const admin = new Admin({
            email: 'admin@gmail.com',
            password: hashedPassword
        });

        await admin.save();
        console.log('Admin user created successfully');
        console.log('Email: admin@gmail.com');
        console.log('Password: admin123');
        
    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seedAdmin(); 