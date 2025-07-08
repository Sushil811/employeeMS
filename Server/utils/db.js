import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employeems';

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URI:', MONGODB_URI);
        
        // Set mongoose options for better connection handling
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect(MONGODB_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`✅ Database name: ${conn.connection.name}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected');
        });
        
        // Test the connection by running a simple query
        const testResult = await mongoose.connection.db.admin().ping();
        console.log('✅ Database ping test:', testResult);
        
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);
        console.log('\n💡 Troubleshooting steps:');
        console.log('1. Make sure MongoDB is running on your system');
        console.log('   - On Windows: net start MongoDB');
        console.log('   - On macOS: brew services start mongodb-community');
        console.log('   - On Linux: sudo systemctl start mongod');
        console.log('2. Check if the connection string is correct');
        console.log('3. Verify MongoDB is accessible on localhost:27017');
        console.log('4. Check if the database name is correct');
        process.exit(1);
    }
};

export default connectDB;