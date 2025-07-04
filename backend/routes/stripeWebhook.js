const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');

const router = express.Router();

// Use raw body to verify Stripe webhook signatures
router.use(bodyParser.raw({ type: 'application/json' }));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

router.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle Stripe event types
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('✅ Payment completed for session:', session.id);
      // TODO: Fulfill order logic here
      break;

    case 'checkout.session.async_payment_succeeded':
      console.log('✅ Delayed payment succeeded:', event.data.object.id);
      break;

    case 'checkout.session.async_payment_failed':
      console.log('❌ Delayed payment failed:', event.data.object.id);
      break;

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
});

module.exports = router;
