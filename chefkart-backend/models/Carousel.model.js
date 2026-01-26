import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Carousel title is required'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Carousel content is required'],
            trim: true
        },
        image: {
            type: String,
            required: [true, 'Carousel image URL is required']
        },
        imagePublicId: {
            type: String,
            required: [true, 'Cloudinary Public ID is required for storage management']
        },
        action: {
            type: String,
            default: '/',
            required: [true, 'Call to action link is required (e.g., /chefs or /booking)']
        }
    },
    {
        // Native Mongoose timestamps are more efficient than manual pre-save hooks
        timestamps: true
    }
);

// We name the model 'Carousel' (fixed the spelling from 'Crousel')
const Carousel = mongoose.model('Carousel', carouselSchema);

export default Carousel;