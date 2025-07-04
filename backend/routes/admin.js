const express = require('express');
const router = express.Router();

// Temporary mock databases (in-memory)
let vendors = require('./vendors').vendors;
let couriers = require('./couriers').couriers || [];
let deliveries = []; // In the future this will come from DB

// Get all vendors
router.get('/vendors', (req, res) => {
  res.json(vendors);
});

// Approve vendor
router.post('/vendors/:id/approve', (req, res) => {
  const vendor = vendors.find(v => v.id === parseInt(req.params.id));
  if (vendor) {
    vendor.approved = true;
    res.json({ message: 'Vendor approved', vendor });
  } else {
    res.status(404).json({ message: 'Vendor not found' });
  }
});

// Get all couriers
router.get('/couriers', (req, res) => {
  res.json(couriers);
});

// Assign courier to delivery
router.post('/assign-delivery', (req, res) => {
  const { courierId, deliveryDetails } = req.body;
  deliveries.push({ ...deliveryDetails, courierId });
  res.status(201).json({ message: 'Delivery assigned', delivery: deliveryDetails });
});

module.exports = router;
