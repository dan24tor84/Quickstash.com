// FILE: backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use('/api/vendors', require('./routes/vendors'));
app.use('/api/couriers', require('./routes/couriers'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/products')); // Cloudinary image upload

app.get('/', (req, res) => {
  res.send('QuickStash backend is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
