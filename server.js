// FILE: server.js
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// Route imports
const vendorRoutes = require('./backend/routes/vendors');
const courierRoutes = require('./backend/routes/couriers');
const adminRoutes = require('./backend/routes/admin'); // ✅ Move this here

// Route usage
app.use('/api/vendors', vendorRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/admin', adminRoutes); // ✅ And this here

// Serve frontend build
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
