import express from 'express';
import { createPaymentIntent, handlePaymentSuccess, handleStripeWebhook } from '../controllers/paymentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', authenticateToken, createPaymentIntent);

// Handle successful payment
router.post('/payment-success', authenticateToken, handlePaymentSuccess);

// Stripe webhook endpoint (no auth required as it's called by Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router; 