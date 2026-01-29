import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import xss from 'xss-clean';

// Config
import connectDB from './config/db.js';

// Route Imports (Standardized to match actual filenames)
import userRoutes from './routes/User.route.js';
import blogRoutes from './routes/Blog.route.js';
import testimonialRoutes from './routes/Testimonial.route.js';
import galleryRoutes from './routes/Gallery.route.js';
import carouselRoutes from './routes/Carousel.route.js';
import bookingRoutes from './routes/Booking.route.js';
import chefRoutes from './routes/Chef.route.js';
import connectRoutes from './routes/Connect.route.js';
import serviceRoutes from './routes/Service.route.js';
import homeRoutes from './routes/HomePage.route.js';
import investorContactRoutes from './routes/InvestorContact.route.js';
import investorRoutes from './routes/Investor.route.js';
import foodRoutes from './routes/Food.route.js';
import joinRoutes from './routes/Join.route.js';
import foodGalleryRoutes from './routes/FoodGallery.route.js';
import contactRoutes from './routes/Contact.route.js';

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

// ====================================================
// 🛡️ Security & Middleware
// ====================================================

app.use(helmet());

// Increased limit slightly for multipart/form-data metadata (images go to Cloudinary)
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// app.use(xss());
// app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // Increased to 200 to accommodate frontend asset loading
  message: 'Too many requests, please try again later.',
});
app.use('/api', limiter);

app.use(cors({
  origin: 'http://localhost:5173','https://chefkart-fullstack-16.onrender.com'
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ====================================================
// 🛣️ Routes (The MVC Hub)
// ====================================================

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'ChefKart API is live 🐻',
    timestamp: new Date()
  });
});

const apiV1 = express.Router();
// backend/app.js



apiV1.use('/users', userRoutes);         // Standardized from /auth
apiV1.use('/blogs', blogRoutes);
apiV1.use('/testimonials', testimonialRoutes);
apiV1.use('/gallery', galleryRoutes);
apiV1.use('/carousel', carouselRoutes);
apiV1.use('/chefs', chefRoutes);
apiV1.use('/bookings', bookingRoutes);
apiV1.use('/services', serviceRoutes);
apiV1.use('/home-page', homeRoutes);
apiV1.use('/investors', investorRoutes);
apiV1.use('/investor-contact', investorContactRoutes);
apiV1.use('/connect', connectRoutes);
apiV1.use('/food-gallery', foodGalleryRoutes);
apiV1.use('/food', foodRoutes);
apiV1.use('/join', joinRoutes);
apiV1.use('/contacts', contactRoutes);  // Added missing Contact route

app.use('/api/v1', apiV1);

// ====================================================
// ❌ Error Handling
// ====================================================

app.use((req, res, next) => {
  next(createError.NotFound('Route not found'));
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// ====================================================
// 🔌 Execution
// ====================================================

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Startup Error:', error);
    process.exit(1);
  }
};

startServer();
