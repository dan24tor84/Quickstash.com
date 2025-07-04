// FILE: backend/routes/admin.js
const express = require('express');
const router = express.Router();

// In-memory mock data (swap with DB later)
let vendors = [
  { id: 1, name: 'Example Dispensary', email: 'dispensary@example.com', approved: false }
];

let couriers = [
  { id: 1, name: 'Test Courier', email: 'courier@example.com' }
];

let deliveries = [
  // { id: 1, courierId: 1, address: '123 Main St', eta: '15 min', status: 'assigned' }
];

// GET: List of vendors
router.get('/vendors', (req, res) => {
  res.json(vendors);
});

// POST: Approve a vendor
router.post('/vendors/:id/approve', (req, res) => {
  const vendor = vendors.find(v => v.id == req.params.id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  vendor.approved = true;
  res.json({ message: 'Vendor approved', vendor });
});

// GET: List of couriers
router.get('/couriers', (req, res) => {
  res.json(couriers);
});

// POST: Assign a delivery
router.post('/assign-delivery', (req, res) => {
  const { courierId, address } = req.body;
  if (!courierId || !address) return res.status(400).json({ error: 'Courier ID and address required' });

  const courier = couriers.find(c => c.id == courierId);
  if (!courier) return res.status(404).json({ error: 'Courier not found' });

  const newDelivery = {
    id: deliveries.length + 1,
    courierId: parseInt(courierId),
    address,
    eta: 'Calculating...',
    status: 'assigned'
  };

  deliveries.push(newDelivery);
  res.status(201).json({ message: 'Delivery assigned', delivery: newDelivery });
});

module.exports = router;
