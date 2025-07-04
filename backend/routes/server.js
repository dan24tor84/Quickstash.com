const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Stripe webhook requires raw body
const bodyParser = require('body-parser');

// Routes
const vendorRoutes = require('./routes/vendors');
const courierRoutes = require('./routes/couriers');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const stripeWebhook = require('./routes/stripeWebhook');

// Stripe webhook must come BEFORE express.json
app.use('/api/stripe/webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

// Now regular middlewares
app.use(cors());
app.use(express.json());

// Other API routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);

// Serve frontend (optional for Netlify fallback)
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
