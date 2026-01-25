import mongoose from 'mongoose';

const foodGallerySchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, 'Image URL is required']
        },
        imagePublicId: {
            type: String,
            required: [true, 'Cloudinary Public ID is required for storage management']
        },
        caption: {
            type: String,
            trim: true,
            maxlength: [200, 'Caption cannot exceed 200 characters']
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Links the photo to the user who uploaded it
            required: false
        }
    },
    {
        // Replaces manual 'updatedAt' logic with native performance
        timestamps: true
    }
);

// Fixed the naming from 'FoodGaller' to 'FoodGallery'
const FoodGallery = mongoose.model('FoodGallery', foodGallerySchema);

export default FoodGallery;