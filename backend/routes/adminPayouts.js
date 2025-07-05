const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');

// Shared payout array (import if stored elsewhere)
let payouts = require('./payoutsData'); // Optional: replace with DB integration

router.get('/summary', (req, res) => {
  const totals = payouts.reduce((acc, p) => {
    acc.total += p.amount;
    acc.byCourier[p.courierId] = (acc.byCourier[p.courierId] || 0) + p.amount;
    return acc;
  }, { total: 0, byCourier: {} });

  res.json(totals);
});

router.get('/export/csv', (req, res) => {
  const fields = ['id', 'courierId', 'amount', 'date', 'status'];
  const opts = { fields };
  const parser = new Parser(opts);
  const csv = parser.parse(payouts);

  res.header('Content-Type', 'text/csv');
  res.attachment('payouts.csv');
  return res.send(csv);
});

module.exports = router;
