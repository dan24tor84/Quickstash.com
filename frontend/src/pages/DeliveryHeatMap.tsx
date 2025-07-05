// FILE: frontend/src/pages/DeliveryHeatMap.tsx

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function DeliveryHeatMap() {
  useEffect(() => {
    // Create the map
    const map = L.map('map').setView([34.0522, -118.2437], 10); // Default to LA

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Sample delivery data - replace with real-time data later
    const deliveryPoints = [
      [34.0522, -118.2437],
      [34.0622, -118.2537],
      [34.0722, -118.2437],
      [34.0322, -118.2637],
      [34.0422, -118.2737],
    ];

    deliveryPoints.forEach(([lat, lng]) => {
      L.circle([lat, lng], {
        radius: 300,
        color: 'green',
        fillColor: '#2ecc71',
        fillOpacity: 0.5,
      }).addTo(map);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Delivery Heat Map</h2>
      <div id="map" style={{ height: '500px', width: '100%' }} />
    </div>
  );
}
