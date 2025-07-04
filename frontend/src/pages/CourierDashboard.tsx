// FILE: frontend/src/pages/CourierDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CourierDashboard() {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [status, setStatus] = useState('idle');
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    async function fetchDeliveries() {
      const res = await axios.get('/api/couriers/deliveries');
      setDeliveries(res.data);
    }
    fetchDeliveries();
  }, []);

  const updateStatus = async (deliveryId: number, newStatus: string) => {
    await axios.post('/api/couriers/update-status', { deliveryId, newStatus });
    alert(`Delivery ${deliveryId} marked as ${newStatus}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Courier Dashboard</h2>
      <p className="text-gray-700 mb-2">
        Current Location: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-2">Assigned Deliveries</h3>
      {deliveries.length === 0 && <p>No deliveries assigned.</p>}
      <ul className="space-y-4">
        {deliveries.map((delivery: any) => (
          <li key={delivery.id} className="border p-4 rounded">
            <p><strong>To:</strong> {delivery.address}</p>
            <p><strong>ETA:</strong> {delivery.eta || 'Calculating...'}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => updateStatus(delivery.id, 'en route')}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Mark En Route
              </button>
              <button
                onClick={() => updateStatus(delivery.id, 'delivered')}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Mark Delivered
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
