import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Couriers() {
  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const res = await axios.get('/api/couriers');
        setCouriers(res.data);
      } catch (error) {
        console.error('Error fetching couriers:', error);
      }
    };

    fetchCouriers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Couriers</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {couriers.map((courier) => (
          <div
            key={courier.id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="text-xl font-semibold">{courier.name}</h3>
            <p><strong>Email:</strong> {courier.email}</p>
            <p><strong>Status:</strong> {courier.status || 'Pending'}</p>
            <p><strong>Location:</strong> {courier.location || 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
