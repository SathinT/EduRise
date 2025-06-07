import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { PaymentConfirmation } from './PaymentConfirmation';
import { toast } from 'react-toastify';


const PaymentForm = ({ fundId, amount, fundTitle, thankingOptions, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [transactionId, setTransactionId] = useState(null);

    const handleDonationSuccess = () => {
        toast.success("🎉 Donation successful! Thank you for your support!");
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // Create payment intent
            const { data: { clientSecret } } = await axios.post(
                'http://localhost:5000/api/payments/create-payment-intent',
                { fundId, amount },
                { 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            // Confirm the payment
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded');
                handleDonationSuccess();
                alert(amount + "Donated Successfully")
                // Handle successful payment

                const response = await axios.post(
                    'http://localhost:5000/api/payments/payment-success',
                    { fundId, amount, thankingOptions },
                    { 
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                
                setTransactionId(paymentIntent.id);
                setShowConfirmation(true);
                onSuccess();
            }
        } catch (err) {
            console.error('Payment error:', err);
            alert("Donation failed. Please try again.");
            setError(err.response?.data?.message || 'An error occurred during payment');
        } finally {
            setProcessing(false);
        }
    };

    if (showConfirmation) {
        return (
            <PaymentConfirmation
                donationDetails={{
                    amount,
                    fundTitle,
                    transactionId
                }}
                onClose={() => setShowConfirmation(false)}
            />
        );
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-center">Make a Donation</h2>
                
                <div className="w-full">
                    <label className="block text-gray-700 text-lg font-bold mb-3">
                        Card Details
                    </label>
                    <div className="p-6 border-2 border-gray-300 rounded-lg bg-white">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                        backgroundColor: 'transparent',
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-md text-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!stripe || processing}
                    className={`w-full py-4 px-6 rounded-lg text-white font-bold text-xl ${
                        !stripe || processing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {processing ? 'Processing...' : `Donate LKR ${amount}`}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm; 