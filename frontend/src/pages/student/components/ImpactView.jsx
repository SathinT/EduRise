import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

export function ImpactView() {
    const [impact, setImpact] = useState({
        totalFunds: 0,
        totalDonations: 0,
        totalDonors: 0,
        completedFunds: 0,
        activeFunds: 0,
        pendingFunds: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchImpact();
    }, []);

    const fetchImpact = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/student/impact', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setImpact(data);
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to fetch impact data');
            }
        } catch (error) {
            setError('Failed to fetch impact data');
            console.error('Error fetching impact data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR'
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading impact data...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">My Impact</h2>
                <p className="text-gray-600">
                    Track your fundraising progress and impact
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Donations</p>
                            <p className="text-2xl font-semibold">{formatCurrency(impact.totalDonations)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Donors</p>
                            <p className="text-2xl font-semibold">{impact.totalDonors}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <Target className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Funds</p>
                            <p className="text-2xl font-semibold">{impact.totalFunds}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <TrendingUp className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Success Rate</p>
                            <p className="text-2xl font-semibold">
                                {impact.totalFunds > 0
                                    ? `${Math.round((impact.completedFunds / impact.totalFunds) * 100)}%`
                                    : '0%'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Fund Status</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-500">Completed</span>
                                    <span className="text-sm font-medium text-gray-900">{impact.completedFunds}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-600 h-2 rounded-full"
                                        style={{
                                            width: `${(impact.completedFunds / impact.totalFunds) * 100}%`
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-500">Active</span>
                                    <span className="text-sm font-medium text-gray-900">{impact.activeFunds}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{
                                            width: `${(impact.activeFunds / impact.totalFunds) * 100}%`
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-500">Pending</span>
                                    <span className="text-sm font-medium text-gray-900">{impact.pendingFunds}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-yellow-600 h-2 rounded-full"
                                        style={{
                                            width: `${(impact.pendingFunds / impact.totalFunds) * 100}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                        {impact.recentActivity.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                No recent activity
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {impact.recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className={`p-2 rounded-full ${
                                            activity.type === 'donation'
                                                ? 'bg-green-100'
                                                : activity.type === 'fund'
                                                ? 'bg-blue-100'
                                                : 'bg-yellow-100'
                                        }`}>
                                            {activity.type === 'donation' ? (
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                            ) : activity.type === 'fund' ? (
                                                <Target className="w-4 h-4 text-blue-600" />
                                            ) : (
                                                <TrendingUp className="w-4 h-4 text-yellow-600" />
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(activity.timestamp).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 