import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Add index for better performance
categorySchema.index({ name: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category; 