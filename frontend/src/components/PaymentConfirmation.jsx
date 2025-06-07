import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export function PaymentConfirmation({ donationDetails, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="bg-green-100 p-3 rounded-full">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
                    
                    <div className="space-y-2 text-gray-600">
                        <p>Thank you for your generous donation!</p>
                        <p className="font-medium text-lg text-gray-900">
                            Amount: LKR {donationDetails.amount.toLocaleString()}
                        </p>
                        <p>Fund: {donationDetails.fundTitle}</p>
                        <p className="text-sm">
                            Transaction ID: {donationDetails.transactionId}
                        </p>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={onClose}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        >
                            <ArrowLeft size={18} />
                            Back to Funds
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 