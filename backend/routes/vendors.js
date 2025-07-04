const express = require('express');
const router = express.Router();

let vendors = []; // In-memory storage (replace with DB later if needed)

// POST /api/vendors/register
router.post('/register', (req, res) => {
  const { name, email, password, weedmapsLink } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const vendor = {
    id: vendors.length + 1,
    name,
    email,
    password,
    weedmapsLink: weedmapsLink || ''
  };

  vendors.push(vendor);

  res.status(201).json({
    message: 'Vendor registered successfully',
    vendor
  });
});

// GET /api/vendors
router.get('/', (req, res) => {
  res.json(vendors);
});

// (Optional) GET /api/vendors/:id
router.get('/:id', (req, res) => {
  const vendor = vendors.find(v => v.id === parseInt(req.params.id));
  if (!vendor) return res.status(404).json({ message: 'Vendor not found.' });
  res.json(vendor);
});

module.exports = router;
