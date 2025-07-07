const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

// Load environment variables
dotenv.config();

// Use JSON parser for all routes except Stripe webhook
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(cors());

// Route imports
const vendors = require('./vendors');
const couriers = require('./couriers');
const orders = require('./orders');
const products = require('./products');
const payouts = require('./payouts');
const payments = require('./payments');
const analytics = require('./analytics');
const stripeWebhook = require('./stripeWebhook');
const admin = require('./admin');
const adminOrders = require('./adminOrders');
const adminPayouts = require('./adminPayouts');
const adminAnalytics = require('./adminAnalytics');
const adminCourierLocations = require('./adminCourierLocations');
const route = require('./route');

// Stripe webhook (requires raw body)
app.use('/api/webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

// All other routes
app.use('/api/vendors', vendors);
app.use('/api/couriers', couriers);
app.use('/api/orders', orders);
app.use('/api/products', products);
app.use('/api/payouts', payouts);
app.use('/api/payments', payments);
app.use('/api/analytics', analytics);
app.use('/api/admin', admin);
app.use('/api/admin/orders', adminOrders);
app.use('/api/admin/payouts', adminPayouts);
app.use('/api/admin/analytics', adminAnalytics);
app.use('/api/admin/courier-locations', adminCourierLocations);
app.use('/api/route', route);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root API info
app.get('/', (req, res) => {
  res.json({
    service: 'QuickStash Backend API',
    status: 'running',
    routes: [
      '/health',
      '/api/vendors',
      '/api/couriers',
      '/api/orders',
      '/api/products',
      '/api/payouts',
      '/api/payments',
      '/api/analytics',
      '/api/webhook',
      '/api/admin',
      '/api/admin/orders',
      '/api/admin/payouts',
      '/api/admin/analytics',
      '/api/admin/courier-locations',
      '/api/route'
    ]
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`QuickStash backend running on port ${PORT}`);
});
