import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Food name is required'],
            trim: true,
            maxlength: [100, 'Food name cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Food description is required'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
        category: {
            type: String,
            required: [true, 'Category is required (e.g., Starter, Main Course)'],
            enum: {
                values: ['Starter', 'Main Course', 'Dessert', 'Beverage', 'Snack'],
                message: '{VALUE} is not a valid food category'
            }
        },
        isVeg: {
            type: Boolean,
            default: true
        },
        image: {
            type: String,
            required: [true, 'Food image URL is required']
        },
        imagePublicId: {
            type: String,
            required: [true, 'Cloudinary Public ID is required for storage management']
        }
    },
    {
        // Native Mongoose timestamps: handles 'createdAt' and 'updatedAt' automatically
        timestamps: true
    }
);

// Search Index: Allows you to search for food by name or description
foodSchema.index({ name: 'text', description: 'text' });

const Food = mongoose.model('Food', foodSchema);

export default Food;