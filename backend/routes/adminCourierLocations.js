// FILE: backend/routes/adminCourierLocations.js const express = require('express'); const router = express.Router();

// In-memory courier location storage (replace with DB in production) let courierLocations = [ { id: 1, name: 'John Doe', lat: 34.0522, lon: -118.2437 }, // Los Angeles { id: 2, name: 'Jane Smith', lat: 37.7749, lon: -122.4194 } // San Francisco ];

// Simulated update endpoint (optional) router.post('/update-courier-location', (req, res) => { const { id, name, lat, lon } = req.body; const existing = courierLocations.find(c => c.id === id);

if (existing) { existing.lat = lat; existing.lon = lon; } else { courierLocations.push({ id, name, lat, lon }); }

res.json({ message: 'Location updated' }); });

// Get all courier locations router.get('/courier-locations', (req, res) => { res.json(courierLocations); });

module.exports = router;
