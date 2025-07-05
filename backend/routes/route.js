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
        coordinates: coordinates.map((c) => [c.lon, c.lat]) // [lon, lat] format
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(orsRes.data);
  } catch (error) {
    console.error('Route optimization error:', error.message);
    res.status(500).json({ error: 'Failed to generate route' });
  }
});

module.exports = router;
