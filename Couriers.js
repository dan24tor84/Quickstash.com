// FILE: backend/routes/couriers.js const express = require('express'); const router = express.Router();

// In-memory courier list (replace with DB later) let couriers = [];

router.post('/register', (req, res) => { const { name, email, password } = req.body; const courier = { id: couriers.length + 1, name, email, password }; couriers.push(courier); res.status(201).json({ message: 'Courier registered', courier }); });

router.get('/list', (req, res) => { res.json(couriers); });

module.exports = router;
