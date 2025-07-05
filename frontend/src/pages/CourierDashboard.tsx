// FILE: frontend/src/pages/CourierDashboard.tsx
import React, { useEffect, useState } from 'react';

type Delivery = {
  id: string;
  customerName: string;
  destination: {
    lat: number;
    lon: number;
  };
};

const CourierDashboard: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [eta, setEta] = useState<string | null>(null);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch('/api/deliveries');
      const data = await response.json();
      setDeliveries(data);
    } catch (err) {
      console.error('Failed to fetch deliveries:', err);
    }
  };

  const optimizeRoute = async (coords: { latitude: number; longitude: number }) => {
    try {
      const response = await fetch('/api/route/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coords),
      });

      const data = await response.json();

      if (data && data.duration) {
        const etaInMinutes = Math.round(data.duration / 60);
        setEta(`${etaInMinutes} min`);
      }
    } catch (err) {
      console.error('Failed to optimize route:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Courier Dashboard</h1>
      <ul className="space-y-4">
        {deliveries.map((delivery) => (
          <li key={delivery.id} className="border p-4 rounded shadow">
            <p className="font-semibold">Delivery to: {delivery.customerName}</p>
            <p>Lat: {delivery.destination.lat}</p>
            <p>Lon: {delivery.destination.lon}</p>
            <button
              onClick={() =>
                optimizeRoute({
                  latitude: delivery.destination.lat,
                  longitude: delivery.destination.lon,
                })
              }
              className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
            >
              Get Route
            </button>
            {eta && <p className="text-sm text-gray-600 mt-1">ETA: {eta}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourierDashboard;
