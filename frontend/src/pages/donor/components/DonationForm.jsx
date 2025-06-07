import React, { useState, useEffect, useCallback } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../../../components/PaymentForm';

// Load Stripe outside of component to avoid recreating on each render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function DonationForm({ onClose, eventDetails }) {
    const [amount, setAmount] = useState('');
    const [thankingOptions, setThankingOptions] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        setShowPaymentForm(true);
    }, [amount]);

    const handlePaymentSuccess = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleBack = useCallback(() => {
        setShowPaymentForm(false);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden">
                <div className="flex justify-between items-center py-6 px-8 bg-gray-900">
                    <h2 className="text-2xl font-bold text-white">
                        Make Your Donation
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300"
                    >
                        ✕
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* Event Details */}
                    <div className="bg-gray-900 p-6 rounded-lg text-white">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold">Organized By</h3>
                            <p className="text-yellow-400">{eventDetails.organizer}</p>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold">Event</h3>
                            <p className="text-yellow-400">{eventDetails.eventName}</p>
                            <p className="text-yellow-400">({eventDetails.eventType})</p>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold">Goal</h3>
                            <p className="text-yellow-400">{eventDetails.goalAmount}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Achieved</h3>
                            <p className="text-yellow-400">{eventDetails.achievedPercentage}</p>
                        </div>
                    </div>

                    {/* Donation Form */}
                    {!showPaymentForm ? (
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Donation Amount (LKR)
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    className="w-full p-3 border border-yellow-400 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    min="1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Thank You Preference
                                </label>
                                <select
                                    value={thankingOptions}
                                    onChange={(e) => setThankingOptions(e.target.value)}
                                    className="w-full p-3 border border-yellow-400 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="">None</option>
                                    <option value="Note">Note</option>
                                    <option value="Graphic / Image">Graphic / Image</option>
                                    <option value="Random">Random</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md font-medium hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black py-2 px-6 rounded-md font-medium hover:bg-yellow-300"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="w-full">
                            <Elements stripe={stripePromise}>
                                <PaymentForm
                                    fundId={eventDetails.fundId}
                                    amount={parseFloat(amount)}
                                    fundTitle={eventDetails.eventName}
                                    thankingOptions={thankingOptions}
                                    onSuccess={handlePaymentSuccess}
                                />
                            </Elements>
                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-full mt-4 bg-gray-200 text-gray-800 py-2 px-6 rounded-md font-medium hover:bg-gray-300"
                            >
                                Back
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
