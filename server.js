import React, { useState } from 'react';
import axios from 'axios';

export default function CustomerOrderForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    product: '',
    quantity: 1,
    deliveryTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/orders/create', form);
      alert('Order placed successfully!');
      setForm({
        name: '',
        phone: '',
        address: '',
        product: '',
        quantity: 1,
        deliveryTime: '',
      });
    } catch (error) {
      alert('There was an error placing your order.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="border p-2 mb-4 w-full"
      />

      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
        className="border p-2 mb-4 w-full"
      />

      <input
        name="address"
        placeholder="Delivery Address"
        value={form.address}
        onChange={handleChange}
        required
        className="border p-2 mb-4 w-full"
      />

      <select
        name="product"
        value={form.product}
        onChange={handleChange}
        required
        className="border p-2 mb-4 w-full"
      >
        <option value="">Select a Product</option>
        <option value="Pre-Roll">Pre-Roll</option>
        <option value="Edible">Edible</option>
        <option value="Flower">Flower</option>
        <option value="Vape">Vape</option>
        {/* Replace with dynamic list if needed */}
      </select>

      <input
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        min={1}
        required
        className="border p-2 mb-4 w-full"
      />

      <input
        name="deliveryTime"
        type="datetime-local"
        value={form.deliveryTime}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
      />

      <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
        Submit Order
      </button>
    </form>
  );
}
