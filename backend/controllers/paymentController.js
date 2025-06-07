import Stripe from 'stripe';
import FundingProfile from '../models/student/FundingProfile.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16' // Use the latest API version
});

// Create a payment intent
export const createPaymentIntent = async (req, res) => {
    try {
        const { fundId, amount } = req.body;

        // Validate the fund exists and is active
        const fund = await FundingProfile.findOne({
            _id: fundId,
            status: 'Active',
            approved: true
        });

        if (!fund) {
            return res.status(404).json({ message: 'Fund not found or not active' });
        }

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.max(amount * 100, 50), // Ensure minimum amount of 50 cents
            currency: 'usd', // Using USD for reliable Stripe processing
            metadata: {
                fundId: fundId,
                donorId: req.user._id.toString()
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: 'Error creating payment intent' });
    }
};

// Handle successful payment
export const handlePaymentSuccess = async (req, res) => {
    try {
        const { fundId, amount, thankingOptions } = req.body;

        // Find the fund
        const fund = await FundingProfile.findById(fundId);
        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }

        // Add the donation
        fund.donors.push({
            donor: req.user._id,
            amount: amount,
            date: new Date(),
            thankingOptions: thankingOptions || ''
        });

        // Update raised amount
        fund.raisedAmount += amount;

        await fund.save();

        res.json({
            message: 'Payment successful',
            fund: {
                id: fund._id,
                raisedAmount: fund.raisedAmount,
                status: fund.status
            }
        });
    } catch (error) {
        console.error('Error handling payment success:', error);
        res.status(500).json({ message: 'Error processing payment' });
    }
};

// Webhook handler for Stripe events
export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
            case 'charge.succeeded':
                const paymentIntent = event.data.object;
                // Handle successful payment
                console.log('Payment succeeded:', paymentIntent);
                break;
            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;
                // Handle failed payment
                console.log('Payment failed:', failedPayment);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } catch (err) {
        console.error('Webhook error:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
}; 