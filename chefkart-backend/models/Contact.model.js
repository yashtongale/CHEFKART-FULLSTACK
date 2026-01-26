import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
            index: true // Useful for sorting leads by region
        },
        area: {
            type: String,
            required: [true, 'Area is required'],
            trim: true
        },
        status: {
            type: String,
            enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Closed'],
            default: 'New'
        },
        source: {
            type: String,
            default: 'Website' // Helps track if lead came from Web, App, or Referral
        }
    },
    {
        // Native Mongoose timestamps: handles 'createdAt' and 'updatedAt' automatically
        timestamps: true
    }
);

// Performance: Compound index for filtering leads by city and status
contactSchema.index({ city: 1, status: 1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;