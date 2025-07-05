import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function CourierDashboard() {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

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

  const optimizeRoute = async () => {
    try {
      const coords = [
        { lat: location.lat, lon: location.lon },
        ...deliveries.map((d) => d.coordinates)
      ];

      const res = await axios.post('/api/route', { coordinates: coords });
      const data = res.data;

      setRouteCoords(
        data.geometry.coordinates.map(
          ([lon, lat]: [number, number]) => [lat, lon]
        )
      );
    } catch (err) {
      alert('Error generating route');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Courier Dashboard</h2>
      <p className="text-gray-700 mb-2">
        Current Location: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
      </p>

      <button
        onClick={optimizeRoute}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Get Optimized Route
      </button>

      <h3 className="text-xl font-semibold mt-4 mb-2">Assigned Deliveries</h3>
      {deliveries.length === 0 && <p>No deliveries assigned.</p>}
      <ul className="space-y-4">
        {deliveries.map((delivery) => (
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

      {routeCoords.length > 0 && (
        <MapContainer
          center={routeCoords[0]}
          zoom={13}
          style={{ height: '300px', width: '100%', marginTop: '2rem' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Polyline positions={routeCoords} color="blue" />
          <Marker position={routeCoords[0]}>
            <Popup>Your Starting Point</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}
