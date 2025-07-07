const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

// Route mounting
app.use('/api/vendors', vendors);
app.use('/api/couriers', couriers);
app.use('/api/orders', orders);
app.use('/api/products', products);
app.use('/api/payouts', payouts);
app.use('/api/payments', payments);
app.use('/api/analytics', analytics);
app.use('/api/webhook', stripeWebhook); // Stripe webhooks
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

// Root info route
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
  console.log(`✅ QuickStash backend running on port ${PORT}`);
});
