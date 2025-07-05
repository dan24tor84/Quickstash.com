const express = require('express');
const router = express.Router();

// In-memory payout data — replace with DB later
let payouts = [];

router.post('/record', (req, res) => {
  const { courierId, amount, date, status } = req.body;
  const payout = {
    id: payouts.length + 1,
    courierId,
    amount,
    date: date || new Date().toISOString(),
    status: status || 'pending',
  };
  payouts.push(payout);
  res.status(201).json({ message: 'Payout recorded', payout });
});

router.get('/history/:courierId', (req, res) => {
  const { courierId } = req.params;
  const history = payouts.filter(p => p.courierId === courierId);
  res.json(history);
});

module.exports = router;
