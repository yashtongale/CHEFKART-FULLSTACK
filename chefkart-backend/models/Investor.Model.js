import mongoose from 'mongoose';

const investorSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required for investor content'],
            trim: true
        },
        subtitle: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: ['Financials', 'Governance', 'News', 'Leadership', 'Mission'],
                message: '{VALUE} is not a valid investor category'
            },
            default: 'News'
        },
        image: {
            type: String,
            required: [true, 'An image URL (PDF/Icon/Photo) is required']
        },
        imagePublicId: {
            type: String,
            required: [true, 'Cloudinary Public ID is required for storage management']
        }
    },
    {
        // Native Mongoose timestamps: Automatically manages 'createdAt' and 'updatedAt'
        timestamps: true
    }
);

const Investor = mongoose.model('Investor', investorSchema);

export default Investor;