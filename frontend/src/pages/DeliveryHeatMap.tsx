import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default function DeliveryHeatMap() {
  useEffect(() => {
    const map = L.map('map').setView([34.0522, -118.2437], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    async function fetchDeliveries() {
      try {
        const res = await axios.get('/api/analytics/delivery-locations');
        const deliveryPoints = res.data;

        deliveryPoints.forEach((point: { lat: number; lng: number }) => {
          L.circle([point.lat, point.lng], {
            radius: 300,
            color: 'green',
            fillColor: '#2ecc71',
            fillOpacity: 0.5,
          }).addTo(map);
        });
      } catch (err) {
        console.error('Failed to load delivery locations', err);
      }
    }

    fetchDeliveries();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Live Delivery Heat Map</h2>
      <div id="map" style={{ height: '500px', width: '100%' }} />
    </div>
  );
}
