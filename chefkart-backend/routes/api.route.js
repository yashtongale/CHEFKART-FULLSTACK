import express from 'express';
const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'ChefKart API is live 🚀',
    timestamp: new Date().toISOString()
  });
});

// Import individual route files (We will create these next)
// import authRoutes from './auth.routes.js';
// import chefRoutes from './chef.routes.js';
// import bookingRoutes from './booking.routes.js';

// Define the paths
// router.use('/auth', authRoutes);
// router.use('/chefs', chefRoutes);
// router.use('/bookings', bookingRoutes);

export default router;