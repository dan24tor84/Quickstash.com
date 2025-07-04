import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VendorDashboard() {
  const [vendor, setVendor] = useState({ name: '', weedmapsLink: '' });

  useEffect(() => {
    async function fetchVendor() {
      const res = await axios.get('/api/vendors/me'); // Or adjust based on login logic
      setVendor(res.data);
    }
    fetchVendor();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {vendor.name}</h1>

      <p className="mb-2 text-gray-600">Here's your live Weedmaps menu:</p>

      {vendor.weedmapsLink ? (
        <iframe
          src={vendor.weedmapsLink}
          className="w-full h-[600px] border rounded"
          title="Weedmaps Menu"
        ></iframe>
      ) : (
        <p className="text-red-500">No Weedmaps link set yet.</p>
      )}
    </div>
  );
}
