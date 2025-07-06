import React, { useState } from 'react';
import axios from 'axios';

export default function CourierSignup() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicleType: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/couriers/register', form);
      alert('Courier Registered!');
    } catch (err) {
      alert('Error registering courier');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Courier Sign Up</h2>
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        name="vehicleType"
        placeholder="Vehicle Type (e.g., car, bike)"
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
        Register
      </button>
    </form>
  );
}
