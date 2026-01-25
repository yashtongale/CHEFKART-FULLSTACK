import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // 1. Connection Options Clean-up
    // Mongoose 6+ has deprecated 'useNewUrlParser' and 'useUnifiedTopology'. 
    // They are now default, so we remove them to keep the console clean.
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      // Lower timeout prevents the app from hanging for 30s if DB is unreachable
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 2. Production Resilience: Listen for connection drops
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
    });

  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    // Exit process with failure so your container orchestrator (like Docker/K8s) knows to restart it
    process.exit(1);
  }
};

// 3. Use 'export default' for ES Modules
export default connectDB;