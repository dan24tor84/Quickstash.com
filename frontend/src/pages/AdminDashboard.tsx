// FILE: frontend/src/pages/AdminOrdersDashboard.tsx import React, { useEffect, useState } from 'react'; import axios from 'axios';

export default function AdminOrdersDashboard() { const [orders, setOrders] = useState([]);

useEffect(() => { fetchOrders(); }, []);

const fetchOrders = async () => { const res = await axios.get('/api/admin/orders'); setOrders(res.data); };

const updateStatus = async (orderId, newStatus) => { await axios.post(/api/admin/orders/${orderId}/status, { status: newStatus }); fetchOrders(); };

return ( <div className="p-4"> <h1 className="text-2xl font-bold mb-4">Admin Order Management</h1> {orders.length === 0 ? ( <p>No orders available.</p> ) : ( <ul className="space-y-4"> {orders.map((order) => ( <li key={order.id} className="border p-4 rounded"> <p><strong>Name:</strong> {order.name}</p> <p><strong>Product:</strong> {order.product} (x{order.quantity})</p> <p><strong>Address:</strong> {order.address}</p> <p><strong>Status:</strong> {order.status}</p> <div className="mt-2 space-x-2"> {order.status !== 'delivered' && ( <> <button onClick={() => updateStatus(order.id, 'preparing')} className="bg-yellow-500 text-white px-3 py-1 rounded" > Preparing </button> <button onClick={() => updateStatus(order.id, 'out for delivery')} className="bg-blue-600 text-white px-3 py-1 rounded" > Out for Delivery </button> <button onClick={() => updateStatus(order.id, 'delivered')} className="bg-green-600 text-white px-3 py-1 rounded" > Mark Delivered </button> </> )} </div> </li> ))} </ul> )} </div> ); }
