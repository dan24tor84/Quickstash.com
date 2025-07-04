const express = require('express');
const router = express.Router();

// In-memory vendor list (temporary — replace with DB later)
let vendors = [];

// Register a new vendor
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const vendor = {
    id: vendors.length + 1,
    name,
    email,
    password, // Note: hash this in production!
  };

  vendors.push(vendor);

  res.status(201).json({ message: 'Vendor registered successfully', vendor });
});

// Get list of registered vendors
router.get('/list', (req, res) => {
  res.json(vendors);
});

module.exports = router;
