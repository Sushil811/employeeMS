import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    leave_type: {
        type: String,
        required: true,
        enum: ['Sick Leave', 'Casual Leave', 'Vacation', 'Other']
    },
    from_date: {
        type: Date,
        required: true
    },
    to_date: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected']
    }
}, {
    timestamps: true
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;
