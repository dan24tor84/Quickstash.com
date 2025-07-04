// FILE: frontend/src/pages/AdminOrderDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminOrderDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get('/api/admin/orders');
    setOrders(res.data);
  };

  const markAsDelivered = async (id: number) => {
    await axios.post(`/api/admin/orders/${id}/deliver`);
    fetchOrders();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Order Dashboard</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order: any) => (
            <li key={order.id} className="border p-4 rounded">
              <p><strong>Customer:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Product:</strong> {order.product}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Delivery Time:</strong> {order.deliveryTime}</p>
              <p><strong>Status:</strong> {order.delivered ? 'Delivered' : 'Pending'}</p>
              {!order.delivered && (
                <button
                  onClick={() => markAsDelivered(order.id)}
                  className="mt-2 bg-green-700 text-white px-4 py-2 rounded"
                >
                  Mark as Delivered
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
