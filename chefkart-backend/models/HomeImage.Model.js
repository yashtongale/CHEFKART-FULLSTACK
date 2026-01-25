import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required for the home section'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Description content is required'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Target category is required'],
            enum: {
                values: ['For Singles', 'For Families', 'For Students', 'For Couples', 'Custom Plans'],
                message: '{VALUE} is not a valid home category'
            }
        },
        image: {
            type: String,
            required: [true, 'An image URL is required for this section']
        },
        imagePublicId: {
            type: String,
            required: [true, 'Cloudinary Public ID is required for storage maintenance']
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        // Native Mongoose timestamps: Automatically manages 'createdAt' and 'updatedAt'
        timestamps: true
    }
);

// Changed model name to 'HomePage' to avoid confusion with internal system 'Home' routes
const HomePage = mongoose.model('HomePage', homeSchema);

export default HomePage;