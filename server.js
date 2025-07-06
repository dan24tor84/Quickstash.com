require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Stripe Webhook (MUST be before express.json)
const stripeWebhook = require('./routes/stripeWebhook');
app.use('/api/stripe', stripeWebhook);

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const vendorRoutes = require('./routes/vendors');
const courierRoutes = require('./routes/couriers');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const adminCourierLocations = require('./routes/adminCourierLocations'); // Moved up

// Use routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', adminCourierLocations); // ✅ Will merge cleanly with admin
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);

// Serve frontend if deployed together (e.g., Railway)
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend
