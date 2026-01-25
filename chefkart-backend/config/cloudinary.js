import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// Ensure env vars are loaded if this file is imported directly in scripts
dotenv.config();

// 1. Validation: Ensure keys exist before crashing at runtime
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
   console.error('❌ Cloudinary config missing in .env file');
   process.exit(1);
}

// 2. Configure Cloudinary (Use v2)
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 3. Define Storage Settings
const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      folder: 'ChefKart_Assets', // Use a professional folder name
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: [{ width: 800, height: 800, crop: 'limit' }], // Optimization: Limit max size on upload
   },
});

// 4. Create Multer Middleware
const upload = multer({
   storage: storage,
   limits: {
      fileSize: 5 * 1024 * 1024, // Security: Limit file size to 5MB
   }
});

// 5. Named Exports (Preferred over default exports for utilities)
export { cloudinary, upload };