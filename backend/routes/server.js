const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Route imports
const vendorRoutes = require('./routes/vendors');
const courierRoutes = require('./routes/couriers');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders'); // ✅ new line

// Route usage
app.use('/api/vendors', vendorRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes); // ✅ new line

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
