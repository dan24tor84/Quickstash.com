const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Base route (optional)
app.get('/', (req, res) => {
  res.send('🚀 QuickStash backend is running!');
});

// Import & Use Routes
app.use('/api/vendors', require('./routes/vendors'));
app.use('/api/couriers', require('./routes/couriers'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/admin/analytics', require('./routes/adminAnalytics'));
app.use('/api/admin/orders', require('./routes/adminOrders'));
app.use('/api/admin/payouts', require('./routes/adminPayouts'));
app.use('/api/admin/locations', require('./routes/adminCourierLocations'));
app.use('/api/stripe/webhook', require('./routes/stripeWebhook')); // Stripe webhook route

// Serve frontend build (optional)
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist'); // adjust if using Vite/React
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
