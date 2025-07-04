const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Stripe Webhook (must be mounted BEFORE express.json)
const stripeWebhook = require('./routes/stripeWebhook');
app.use('/api/stripe', stripeWebhook);

// Standard middlewares
app.use(cors());
app.use(express.json());

// Route imports
const vendorRoutes = require('./routes/vendors');
const courierRoutes = require('./routes/couriers');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

// Use routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);

// Optional: Serve frontend if deployed together
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
