import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters']
        },
        content: {
            type: String,
            required: [true, 'Blog content is required']
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
            enum: {
                values: ['Tech', 'Lifestyle', 'Food', 'Health', 'Travel'], // Restricts input to these categories
                message: '{VALUE} is not a supported category'
            }
        },
        image: {
            type: String,
            required: [true, 'Blog image is required']
        },
        imagePublicId: {
            type: String,
            required: [true, 'Cloudinary Public ID is required for storage cleanup'],
        }
    },
    {
        // Native Mongoose timestamps: handles 'createdAt' and 'updatedAt' automatically
        timestamps: true,
    }
);

// Optional: Add a text index to make searching for blogs faster
blogSchema.index({ title: 'text', content: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;