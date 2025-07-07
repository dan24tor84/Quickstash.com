const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth/login');
const registerRoutes = require('./routes/auth/register');
const vendorRoutes = require('./routes/vendors');
const productRoutes = require('./routes/products');
const paymentRoutes = require('./routes/payments');
const payoutRoutes = require('./routes/payouts');
const orderRoutes = require('./routes/orders');
const courierRoutes = require('./routes/couriers');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const stripeWebhook = require('./routes/stripeWebhook');

// Webhook (Stripe) must come before express.json()
app.use('/api/webhook', stripeWebhook);

// API Routes
app.use('/api/auth/login', authRoutes);
app.use('/api/auth/register', registerRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/payouts', payoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

// Production build (optional: serves frontend build if needed)
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
