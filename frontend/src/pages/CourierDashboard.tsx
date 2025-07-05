import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
// frontend/src/components/CourierDashboard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Delivery {
  id: number;
  address: string;
  destination: { lat: number; lon: number };
  status: string;
}

const CourierDashboard = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // Get courier's current location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
      },
      (err) => console.error('Geolocation error:', err)
    );

    // Load deliveries
    const fetchDeliveries = async () => {
      const res = await axios.get('/api/couriers/deliveries');
      setDeliveries(res.data);
    };
    fetchDeliveries();
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    await axios.put(`/api/couriers/update-status/${id}`, { status: newStatus });
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  const optimizeRoute = async (destination: { latitude: number; longitude: number }) => {
    try {
      const res = await axios.post('/api/couriers/optimize-route', {
        start: location,
        destination,
      });
      const route = res.data.route;
      console.log('Optimized Route:', route);
      alert(`Optimized ETA: ${Math.round(route.duration / 60)} mins`);
    } catch (err) {
      console.error('Route optimization failed', err);
      alert('Could not get route at this time');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Courier Dashboard</h2>
      <ul className="space-y-4">
        {deliveries.map((delivery) => (
          <li key={delivery.id} className="p-4 border rounded shadow">
            <p><strong>Address:</strong> {delivery.address}</p>
            <p><strong>Status:</strong> {delivery.status}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => updateStatus(delivery.id, 'Picked Up')}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Picked Up
              </button>
              <button
                onClick={() => updateStatus(delivery.id, 'Delivered')}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Delivered
              </button>
              <button
                onClick={() =>
                  optimizeRoute({
                    latitude: delivery.destination.lat,
                    longitude: delivery.destination.lon,
                  })
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Get Route
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourierDashboard;
<button
  onClick={() =>
    optimizeRoute({
      latitude: delivery.destination.lat,
      longitude: delivery.destination.lon,
    })
  }
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  Get Route
</button>
