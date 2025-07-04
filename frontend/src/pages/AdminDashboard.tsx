import React, { useEffect, useState } from 'react'; import axios from 'axios';

export default function AdminDashboard() { const [vendors, setVendors] = useState([]); const [couriers, setCouriers] = useState([]); const [delivery, setDelivery] = useState({ courierId: '', address: '' });

useEffect(() => { fetchVendors(); fetchCouriers(); }, []);

const fetchVendors = async () => { const res = await axios.get('/api/admin/vendors'); setVendors(res.data); };

const fetchCouriers = async () => { const res = await axios.get('/api/admin/couriers'); setCouriers(res.data); };

const approveVendor = async (id) => { await axios.post(/api/admin/vendors/${id}/approve); fetchVendors(); };

const assignDelivery = async () => { await axios.post('/api/admin/assign-delivery', delivery); alert('Delivery assigned'); setDelivery({ courierId: '', address: '' }); };

return ( <div className="p-4"> <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

<section className="mb-8">
    <h2 className="text-xl font-semibold mb-2">Vendors</h2>
    {vendors.map((v) => (
      <div key={v.id} className="border p-2 mb-2">
        <p><strong>{v.name}</strong> ({v.email}) - {v.approved ? 'Approved' : 'Pending'}</p>
        {!v.approved && (
          <button onClick={() => approveVendor(v.id)} className="bg-blue-600 text-white px-2 py-1 rounded mt-1">Approve</button>
        )}
      </div>
    ))}
  </section>

  <section>
    <h2 className="text-xl font-semibold mb-2">Assign Delivery</h2>
    <select value={delivery.courierId} onChange={(e) => setDelivery({ ...delivery, courierId: e.target.value })} className="border p-2 mb-2 w-full">
      <option value="">Select Courier</option>
      {couriers.map((c) => (
        <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
      ))}
    </select>
    <input
      type="text"
      placeholder="Delivery Address"
      value={delivery.address}
      onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
      className="border p-2 mb-2 w-full"
    />
    <button onClick={assignDelivery} className="bg-green-700 text-white px-4 py-2 rounded">Assign</button>
  </section>
</div>

); }

