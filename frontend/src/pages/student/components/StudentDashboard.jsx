import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';

export function StudentDashboard() {
    const [view, setView] = useState('funds'); // funds, addFund, details

    return (
        <div className="space-y-8">
            {view === 'funds' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Active Funds</h2>
                        <button
                            onClick={() => setView('addFund')}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center"
                        >
                            <PlusIcon size={18} className="mr-2" />
                            Add Fund
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FundCard
                            title="UG Campus Fund"
                            status="Active"
                            onClick={() => setView('details')}
                        />
                    </div>
                </div>
            )}
            {view === 'addFund' && <AddFundForm onBack={() => setView('funds')} />}
            {view === 'details' && <FundDetails onBack={() => setView('funds')} />}
        </div>
    );
}

function FundCard({ title, status, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
            <div className="aspect-video bg-gray-100 rounded-md mb-4"></div>
            <h3 className="font-medium">{title}</h3>
            <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded mt-2">
                {status}
            </span>
        </div>
    );
}

function AddFundForm({ onBack }) {
    return (
        <div>
            <button
                onClick={onBack}
                className="text-gray-600 mb-4 hover:text-gray-800"
            >
                ← Back
            </button>
            <h2 className="text-xl font-semibold mb-6">Add Fund Profile</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fund Title
                    </label>
                    <input type="text" className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea className="w-full border rounded-md px-3 py-2" rows={4} />
                </div>
                <button
                    type="submit"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

function FundDetails({ onBack }) {
    return (
        <div>
            <button
                onClick={onBack}
                className="text-gray-600 mb-4 hover:text-gray-800"
            >
                ← Back
            </button>
            <h2 className="text-xl font-semibold mb-6">Fund Profile Details</h2>
            <div className="space-y-6">
                <div className="aspect-video bg-gray-100 rounded-md"></div>
                <div>
                    <h3 className="font-medium mb-2">UG Campus Fund</h3>
                    <p className="text-gray-600">
                        Fund description and details would go here...
                    </p>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                        Active
                    </span>
                </div>
            </div>
        </div>
    );
}
