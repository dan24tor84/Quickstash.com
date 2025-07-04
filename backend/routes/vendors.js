// FILE: backend/routes/vendors.js const express = require('express'); const router = express.Router();

// In-memory mock vendor list (replace with DB later) let vendors = [];

router.post('/register', (req, res) => { const { name, email, password } = req.body; const vendor = { id: vendors.length + 1, name, email, password }; vendors.push(vendor); res.status(201).json({ message: 'Vendor registered', vendor }); });

router.get('/list', (req, res) => { res.json(vendors); });

module.exports = router;

// FILE: frontend/src/pages/VendorSignup.tsx import React, { useState } from 'react'; import axios from 'axios';

export default function VendorSignup() { const [form, setForm] = useState({ name: '', email: '', password: '' });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); try { const res = await axios.post('/api/vendors/register', form); alert('Vendor Registered!'); } catch (err) { alert('Error registering vendor'); } };

return ( <form onSubmit={handleSubmit} className="p-4"> <h2 className="text-xl font-bold mb-2">Vendor Sign Up</h2> <input name="name" placeholder="Business Name" onChange={handleChange} className="border p-2 mb-2 w-full" /> <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 mb-2 w-full" /> <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 mb-4 w-full" /> <button type="submit" className="bg-green-600 text-white p-2 rounded">Register</button> </form> ); }

// FILE: frontend/src/pages/VendorDashboard.tsx import React from 'react';

export default function VendorDashboard() { return ( <div className="p-4"> <h1 className="text-2xl font-bold">Vendor Dashboard</h1> <p className="text-gray-600">Add/edit products (coming in next step)</p> </div> ); }
