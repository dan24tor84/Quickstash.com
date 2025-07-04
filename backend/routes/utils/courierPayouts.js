// backend/utils/courierPayouts.js

function calculateDriverPayout(orderSubtotal) {
  const basePay = 5; // base payout in USD
  let bonus = 0;

  if (orderSubtotal >= 100) bonus = 6;
  else if (orderSubtotal >= 75) bonus = 4;
  else if (orderSubtotal >= 50) bonus = 2;

  return basePay + bonus;
}

module.exports = { calculateDriverPayout };
