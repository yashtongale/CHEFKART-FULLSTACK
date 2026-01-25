import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Chef name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required']
        },
        address: { type: String, required: true },
        city: { type: String, required: true, index: true }, // Indexed for faster search
        state: { type: String, required: true },
        area: { type: String, required: true },
        country: { type: String, required: true, default: 'India' },
        pincode: { type: String, required: true },

        // Image Handling
        profilePic: { type: String },
        profilePicPublicId: { type: String }, // For Cloudinary cleanup
        defaultCookImage: { type: String },

        experience: { type: String, required: true },
        verified: { type: Boolean, default: false },
        aboutCook: { type: String, trim: true },
        housesServed: { type: Number, default: 0 },

        // Preferences & Skills
        veg: { type: Boolean, default: false },
        nonVeg: { type: Boolean, default: false },
        languages: [{ type: String }],

        // Ratings System
        starRating: { type: Number, default: 0, min: 0, max: 5 },
        totalRatings: { type: Number, default: 0 },
        cuisineRatings: [
            {
                cuisine: { type: String },
                rating: { type: Number, default: 0 }
            }
        ],

        // Availability
        availableLocations: [{ type: String }],
        availability: [
            {
                start: { type: String }, // "05:00 AM"
                end: { type: String }    // "12:30 PM"
            }
        ],
        isActive: { type: Boolean, default: true }
    },
    {
        // Native Mongoose timestamps: Automatically manages 'createdAt' and 'updatedAt'
        timestamps: true
    }
);

// Performance: Indexing common search patterns
chefSchema.index({ city: 1, veg: 1, nonVeg: 1 });

const Chef = mongoose.model('Chef', chefSchema);

export default Chef;