// FILE: backend/routes/couriers.js
const express = require('express');
const router = express.Router();

// Mock courier and delivery data (replace with database later)
let couriers = [
  { id: 1, name: 'Test Courier', email: 'courier@example.com' },
];

let deliveries = [
  { id: 1, courierId: 1, address: '123 Main St', eta: '15 min', status: 'assigned' },
];

// GET assigned deliveries for a courier
router.get('/deliveries', (req, res) => {
  // In a real app, you'd filter by logged-in courier's ID
  const assignedDeliveries = deliveries;
  res.json(assignedDeliveries);
});

// POST: Update delivery status
router.post('/update-status', (req, res) => {
  const { deliveryId, newStatus } = req.body;
  const delivery = deliveries.find(d => d.id === deliveryId);

  if (!delivery) {
    return res.status(404).json({ error: 'Delivery not found' });
  }

  delivery.status = newStatus;
  res.json({ message: 'Status updated', delivery });
});

module.exports = router;
