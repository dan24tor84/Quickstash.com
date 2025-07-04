const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_live_...');
const bodyParser = require('body-parser');

// Stripe requires raw body to verify signature
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_...'; // your secret from Stripe

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      // ✅ Fulfill the purchase (e.g. save order to DB)
      console.log('✅ Payment successful! Session:', session);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('Webhook received');
});

module.exports = router;
