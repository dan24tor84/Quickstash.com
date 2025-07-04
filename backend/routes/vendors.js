const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// Import API routes
const vendorRoutes = require('./backend/routes/vendors');
const courierRoutes = require('./backend/routes/couriers');
const adminRoutes = require('./backend/routes/admin'); // <— Once you create it

// Register API routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/admin', adminRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
