import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Gallery name is required'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Gallery description/content is required'],
            trim: true
        },
        // Modernized to store both URL and PublicID for every image in the array
        galleryImages: [
            {
                url: { type: String, required: true },
                publicId: { type: String, required: true }
            }
        ],
        category: {
            type: String,
            default: 'General'
        }
    },
    {
        // Native Mongoose timestamps are more performant than manual hooks
        timestamps: true
    }
);

// We name the model 'Gallery'
const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;