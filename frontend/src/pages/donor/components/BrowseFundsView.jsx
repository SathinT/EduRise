import React, { useState, useEffect } from 'react';
import { Link, RefreshCw } from 'lucide-react'
import { fundingApi } from '../../../api/funding';
import { DonationForm } from './DonationForm.jsx'

export function BrowseFundsView() {
    const [showDonationForm, setShowDonationForm] = useState(false)
    const [selectedFund, setSelectedFund] = useState(null)
    const [fundProfiles, setFundProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchFunds = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fundingApi.getApprovedFunds();
            console.log('Fetched funds:', data); // Debug log
            // Only show active funds that haven't been marked as complete by the student
            const activeFunds = data.filter(fund => 
                fund.status === 'Active' && 
                fund.approved === true
            );
            console.log('Active funds:', activeFunds); // Debug log
            setFundProfiles(activeFunds);
        } catch (err) {
            setError('Failed to load funding profiles. Please try again later.');
            console.error('Failed to fetch approved funds:', err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    // Initial fetch only
    useEffect(() => {
        fetchFunds();
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchFunds();
    };

    const handleDonate = (fund) => {
        setSelectedFund(fund);
        setShowDonationForm(true);
    };

    const handleCloseDonationForm = () => {
        setShowDonationForm(false);
        setSelectedFund(null);
    };

    const getImageUrl = (fund) => {
        if (fund.images && fund.images.length > 0) {
            // If the image path is already a full URL, use it directly
            if (fund.images[0].startsWith('http')) {
                return fund.images[0];
            }
            // Otherwise, construct the URL with the backend base URL
            return `http://localhost:5000/uploads/${fund.images[0]}`;
        }
        return '/placeholder-fund.jpg';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading funds...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-center">
                            Browse Fund Profiles
                        </h2>
                        <p className="text-center text-gray-600 mt-2">
                            Support students in their educational journey
                        </p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        title="Refresh funds"
                    >
                        <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                {fundProfiles.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No funding profiles available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fundProfiles.map((fund) => {
                            // Ensure all required properties have default values
                            const processedFund = {
                                ...fund,
                                imageUrl: getImageUrl(fund),
                                raised: fund.raisedAmount || 0,
                                goal: fund.goalAmount || 0,
                                heldBy: fund.student?.name || 'Student',
                                donors: fund.donors?.length || 0,
                                daysLeft: fund.endDate 
                                    ? Math.ceil((new Date(fund.endDate) - new Date()) / (1000 * 60 * 60 * 24))
                                    : 0,
                                title: fund.title || 'Untitled Fund',
                                campusName: fund.university || 'University'
                            };

                            return (
                                <FundCard
                                    key={fund._id}
                                    fund={processedFund}
                                    onDonate={() => handleDonate(processedFund)}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            {showDonationForm && selectedFund && (
                <div className="fixed inset-0 z-50">
                    <DonationForm
                        onClose={handleCloseDonationForm}
                        eventDetails={{
                            organizer: selectedFund.heldBy || 'Unknown Organizer',
                            eventName: selectedFund.title || 'Untitled Fund',
                            eventType: 'Educational Fund',
                            goalAmount: `LKR ${(selectedFund.goal || 0).toLocaleString()}`,
                            achievedPercentage: `${((selectedFund.raised || 0) / (selectedFund.goal || 1) * 100).toFixed(0)}%`,
                            fundId: selectedFund._id
                        }}
                    />
                </div>
            )}
        </div>
    );
}

function FundCard({ fund, onDonate }) {
    const [showDetails, setShowDetails] = useState(false)
    const percentRaised = ((fund.raised || 0) / (fund.goal || 1)) * 100

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={fund.imageUrl}
                    alt={fund.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-fund.jpg';
                    }}
                />
                <div className="absolute bottom-0 left-0 p-2">
                    <div className="bg-gray-900 bg-opacity-75 text-white py-1 px-2 text-xs font-medium rounded">
                        {fund.campusName}
                    </div>
                </div>
            </div>
            <div className="p-4 space-y-4">
                <div>
                    <h3 className="font-medium text-lg">{fund.title}</h3>
                    <p className="text-yellow-600 text-sm">Organized by: {fund.heldBy}</p>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{percentRaised.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-yellow-500 rounded-full"
                            style={{
                                width: `${percentRaised}%`,
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>LKR {(fund.raised || 0).toLocaleString()} raised</span>
                        <span>Goal: LKR {(fund.goal || 0).toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                        <span className="font-medium text-gray-900">{fund.donors}</span>{' '}
                        donors
                    </div>
                    <div>{fund.daysLeft} days left</div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowDetails(true)}
                        className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        View Details
                    </button>
                    <button
                        onClick={onDonate}
                        className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Donate Now
                    </button>
                </div>
            </div>
            {/* Fund Details Modal */}
            {showDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{fund.title}</h2>
                                <p className="text-gray-600">{fund.campusName}</p>
                            </div>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <img
                            src={fund.imageUrl}
                            alt={fund.title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-fund.jpg';
                            }}
                        />
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="font-medium">
                    {percentRaised.toFixed(0)}%
                  </span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-500 rounded-full"
                                        style={{
                                            width: `${percentRaised}%`,
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>LKR {(fund.raised || 0).toLocaleString()} raised</span>
                                    <span>Goal: LKR {(fund.goal || 0).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="prose max-w-none">
                                <h3 className="text-lg font-medium">About this Fund</h3>
                                <p className="text-gray-600">
                                    This fund aims to support students in organizing and
                                    participating in {fund.title}. The funds will be used for
                                    event organization, equipment, and other necessary resources.
                                </p>
                                <h3 className="text-lg font-medium mt-6">Fund Details</h3>
                                <ul className="text-gray-600 list-disc pl-4 space-y-2">
                                    <li>Organized by {fund.heldBy}</li>
                                    <li>{fund.donors} donors have contributed so far</li>
                                    <li>{fund.daysLeft} days remaining to achieve the goal</li>
                                    <li>100% of donations go directly to the cause</li>
                                </ul>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setShowDetails(false)}
                                    className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={onDonate}
                                    className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Support this Fund
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
