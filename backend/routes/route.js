// FILE: backend/routes/route.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const ORS_API_KEY = process.env.ORS_API_KEY || 'YOUR_OPENROUTESERVICE_API_KEY';

router.post('/', async (req, res) => {
  const { coordinates } = req.body;

  try {
    const orsRes = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      {
        coordinates: coordinates.map((c) => [c.lon, c.lat])
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const route = orsRes.data;
    const summary = route.features[0].properties.summary;

    res.json({
      route,
      etaMinutes: Math.round(summary.duration / 60), // Convert seconds to minutes
      distanceKm: (summary.distance / 1000).toFixed(2) // Convert meters to km
    });
  } catch (error) {
    console.error('Route or ETA error:', error.message);
    res.status(500).json({ error: 'Failed to generate route or ETA' });
  }
});

module.exports = router;
