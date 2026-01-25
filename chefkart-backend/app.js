import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import xss from 'xss-clean';

// Config
dotenv.config();
import connectDB from './config/db.js'; // Ensure your files have .js extension in imports

// Route Imports (Standardized naming)
import userRoutes from './routes/User.route.js';
import blogRoutes from './routes/Blog.route.js';
import testimonialRoutes from './routes/Testimonial.route.js';
import galleryRoutes from './routes/Gallery.route.js';
import carouselRoutes from './routes/Crousel.route.js';
import bookingRoutes from './routes/Booking.routes.js';
import chefRoutes from './routes/Chef.route.js';
import connectRoutes from './routes/Connect.route.js';
import serviceRoutes from './routes/Service.route.js';
import homeRoutes from './routes/HomePage.route.js';
import investorContactRoutes from './routes/InvestorContact.route.js';
import investorRoutes from './routes/Investor.route.js';
import foodRoutes from './routes/Food.route.js';
import joinRoutes from './routes/Join.route.js';
import foodGallRoutes from './routes/FoodGall.route.js';

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

// ====================================================
// 🛡️ Security & Middleware ( The "Senior Dev" Touch )
// ====================================================

// 1. Set security HTTP headers (Protects against common attacks)
app.use(helmet());

// 2. Body Parser (Limit body size to prevent DoS)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// 3. Sanitization (Prevent XSS and Parameter Pollution)
app.use(xss());
app.use(hpp());

// 4. Rate Limiting (Prevent Brute Force & Spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter); // Apply to API routes

// 5. CORS (Configure strictly for production)
const corsOptions = {
  origin: process.env.CLIENT_URL || '*', // Restrict this in production!
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));

// 6. Logging (Dev mode only)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ====================================================
// 🛣️ Routes (Grouped & Versioned)
// ====================================================

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'ChefKart Backend is running smoothly 🐻',
    timestamp: new Date()
  });
});

// API Version 1 Grouping (Best Practice)
const apiV1 = express.Router();

apiV1.use('/auth', userRoutes);
apiV1.use('/blog', blogRoutes);
apiV1.use('/testimonial', testimonialRoutes);
apiV1.use('/gallery', galleryRoutes);
apiV1.use('/carousel', carouselRoutes);
apiV1.use('/chef', chefRoutes);
apiV1.use('/investor-contact', investorContactRoutes); // Fixed naming
apiV1.use('/services', serviceRoutes); // Renamed from 'ser' for clarity
apiV1.use('/home', homeRoutes);
apiV1.use('/investor', investorRoutes);
apiV1.use('/booking', bookingRoutes);
apiV1.use('/connect', connectRoutes);
apiV1.use('/food-gallery', foodGallRoutes); // Fixed naming
apiV1.use('/food', foodRoutes);
apiV1.use('/join', joinRoutes);

// Apply prefix
app.use('/api/v1', apiV1);

// ====================================================
// ❌ Error Handling
// ====================================================

// 404 Handler
app.use((req, res, next) => {
  next(createError.NotFound('This route does not exist.'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  // Simple log for dev, structured log for prod
  if (process.env.NODE_ENV === 'development') console.error(err);

  res.status(err.status || 500).json({
    status: 'error',
    code: err.status || 500,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Hide stack in prod
  });
});

// ====================================================
// 🔌 Server Start
// ====================================================

const startServer = async () => {
  try {
    // Connect to DB first
    await connectDB();
    console.log('✅ MongoDB Connected Successfully');

    // Then start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // Exit with failure
  }
};

startServer();