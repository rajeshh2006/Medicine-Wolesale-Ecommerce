import stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const Stripe = process.env.STRIPE_SECRET_KEY 
  ? stripe(process.env.STRIPE_SECRET_KEY) 
  : null;

if (!Stripe) {
  console.warn("\x1b[33m%s\x1b[0m", "[WARN] STRIPE_SECRET_KEY is not set in .env. Online card payments will be simulated or disabled.");
}

export default Stripe;
