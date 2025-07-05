const express = require('express');
const router = express.Router();

// Mock delivery data (replace with real DB later)
const deliveries = [
  { id: 1, lat: 34.0522, lng: -118.2437 },
  { id: 2, lat: 34.0622, lng: -118.2537 },
  { id: 3, lat: 34.0722, lng: -118.2437 },
  { id: 4, lat: 34.0322, lng: -118.2637 },
  { id: 5, lat: 34.0422, lng: -118.2737 },
];

router.get('/delivery-locations', (req, res) => {
  res.json(deliveries);
});

module.exports = router;
