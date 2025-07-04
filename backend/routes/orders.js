const express = require('express');
const router = express.Router();

let orders = []; // Temporary in-memory storage

// Create a new order
router.post('/create', (req, res) => {
  const { customerName, address, items, vendorId } = req.body;

  if (!customerName || !address || !items || !vendorId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newOrder = {
    id: orders.length + 1,
    customerName,
    address,
    items,
    vendorId,
    status: 'Pending',
    createdAt: new Date(),
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Order created successfully', order: newOrder });
});

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get orders for a specific vendor
router.get('/vendor/:vendorId', (req, res) => {
  const vendorOrders = orders.filter(order => order.vendorId == req.params.vendorId);
  res.json(vendorOrders);
});

// Update order status (e.g. Assigned, Out for Delivery, Delivered)
router.put('/update/:orderId', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id == req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status || order.status;
  res.json({ message: 'Order status updated', order });
});

module.exports = router;
