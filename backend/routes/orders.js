// FILE: backend/routes/orders.js

const express = require('express'); const router = express.Router(); const { calculateDriverPayout } = require('../utils/courierPayouts');

// In-memory mock order list (replace with DB later) let orders = [];

// Create order router.post('/create', (req, res) => { const { name, phone, address, product, quantity, deliveryTime } = req.body; const subtotal = calculateSubtotal(product, quantity); // Basic pricing logic const driverPayout = calculateDriverPayout(subtotal);

const newOrder = { id: orders.length + 1, name, phone, address, product, quantity, deliveryTime, subtotal, driverPayout, status: 'pending', };

orders.push(newOrder); res.status(201).json({ message: 'Order created', order: newOrder }); });

// Get all orders router.get('/all', (req, res) => { res.json(orders); });

// Update order status router.post('/update-status', (req, res) => { const { id, status } = req.body; const order = orders.find(o => o.id === id); if (order) { order.status = status; res.json({ message: 'Order status updated', order }); } else { res.status(404).json({ message: 'Order not found' }); } });

// Simple pricing logic (could be replaced with dynamic data) function calculateSubtotal(product, quantity) { const prices = { 'Pre-Roll': 10, 'Edible': 15, 'Flower': 20, 'Vape': 25, }; return (prices[product] || 0) * quantity; }

module.exports = router;
