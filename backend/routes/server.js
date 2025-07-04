// FILE: server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const vendorRoutes = require('./backend/routes/vendors');
const courierRoutes = require('./backend/routes/couriers');
const adminRoutes = require('./backend/routes/admin');
const productRoutes = require('./backend/routes/products');

app.use('/api/vendors', vendorRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('QuickStash backend is live!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
