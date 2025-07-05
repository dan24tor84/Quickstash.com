// FILE: backend/routes/adminAnalytics.js
const express = require('express');
const router = express.Router();

// Mock data sources
const orders = require('../data/orders'); // Replace with DB connection later
const couriers = require('../data/couriers'); // Replace with DB connection later

// GET: Summary analytics
router.get('/summary', (req, res) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  // Calculate performance per courier
  const courierStats = couriers.map((courier) => {
    const delivered = orders.filter(
      (order) => order.courierId === courier.id && order.status === 'delivered'
    );
    const deliveries = delivered.length;
    const earnings = delivered.reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      courierId: courier.id,
      name: courier.name,
      email: courier.email,
      deliveries,
      earnings,
    };
  });

  res.json({
    totalOrders,
    totalRevenue,
    courierStats,
  });
});

module.exports = router;
