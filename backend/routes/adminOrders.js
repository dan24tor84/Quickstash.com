// backend/routes/adminOrders.js const express = require('express'); const router = express.Router();

// Temporary in-memory order storage let orders = require('../data/orders');

// Get all customer orders router.get('/orders', (req, res) => { res.json(orders); });

// Approve an order router.put('/orders/:id/approve', (req, res) => { const { id } = req.params; const order = orders.find(o => o.id === parseInt(id)); if (order) { order.status = 'Approved'; res.json({ success: true, order }); } else { res.status(404).json({ success: false, message: 'Order not found' }); } });

// Assign courier to an order router.put('/orders/:id/assign', (req, res) => { const { id } = req.params; const { courierId } = req.body; const order = orders.find(o => o.id === parseInt(id)); if (order) { order.courierId = courierId; order.status = 'Assigned'; res.json({ success: true, order }); } else { res.status(404).json({ success: false, message: 'Order not found' }); } });

// Mark order as completed router.put('/orders/:id/complete', (req, res) => { const { id } = req.params; const order = orders.find(o => o.id === parseInt(id)); if (order) { order.status = 'Completed'; res.json({ success: true, order }); } else { res.status(404).json({ success: false, message: 'Order not found' }); } });

module.exports = router;
