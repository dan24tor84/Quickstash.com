const express = require('express'); const axios = require('axios'); const cors = require('cors'); const app = express();

require('dotenv').config();

app.use(cors()); app.use(express.json());

// POST /api/couriers/optimize-route app.post('/api/couriers/optimize-route', async (req, res) => { const { start, destination } = req.body;

if (!start || !destination) { return res.status(400).json({ error: 'Missing start or destination coordinates' }); }

try { const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

const response = await axios.get(
  `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${destination.longitude},${destination.latitude}`,
  {
    params: {
      access_token: MAPBOX_TOKEN,
      geometries: 'geojson',
      overview: 'full',
    },
  }
);

const route = response.data.routes[0];
res.json({ route });

} catch (error) { console.error('Mapbox route error:', error.message); res.status(500).json({ error: 'Failed to fetch optimized route' }); } });

// Start server const PORT = process.env.PORT || 5000; app.listen(PORT, () => console.log(Server running on port ${PORT}));
