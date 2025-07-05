// 📍 Real-Time Courier Location Tracking Map

import React, { useEffect } from 'react'; import L from 'leaflet'; import 'leaflet/dist/leaflet.css'; import axios from 'axios';

export default function CourierLocationMap() { useEffect(() => { const map = L.map('courier-map').setView([34.0522, -118.2437], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

let courierMarkers: Record<number, L.Marker> = {};

const updateCourierLocations = async () => {
  try {
    const res = await axios.get('/api/admin/courier-locations');
    const couriers = res.data;

    couriers.forEach((courier: any) => {
      const { id, lat, lon, name } = courier;
      const position = [lat, lon] as [number, number];

      if (courierMarkers[id]) {
        courierMarkers[id].setLatLng(position);
      } else {
        const marker = L.marker(position).addTo(map);
        marker.bindPopup(`<strong>${name}</strong>`);
        courierMarkers[id] = marker;
      }
    });
  } catch (error) {
    console.error('Failed to fetch courier locations', error);
  }
};

updateCourierLocations();
const interval = setInterval(updateCourierLocations, 30000); // Update every 30s
return () => clearInterval(interval);

}, []);

return ( <div className="p-4"> <h2 className="text-2xl font-bold mb-4">Live Courier Tracking</h2> <div id="courier-map" style={{ height: '500px', width: '100%' }}></div> </div> ); }

