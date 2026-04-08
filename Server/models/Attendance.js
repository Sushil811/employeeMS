import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: String, // YYYY-MM-DD
        required: true
    },
    checkIn: {
        type: String, // HH:MM:SS
        required: true
    },
    checkOut: {
        type: String, // HH:MM:SS
        default: null
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Present'
    },
    hoursWorked: {
        type: Number,
        default: 0
    },
    isGoalMet: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Ensure one record per employee per day
AttendanceSchema.index({ employee_id: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', AttendanceSchema);
export default Attendance;
