import React, { useState, useEffect } from 'react'
import {
    BarChart2Icon,
    TrendingUpIcon,
    UsersIcon,
    GiftIcon,
} from 'lucide-react'

export function AnalyticsView() {
    const [stats, setStats] = useState({
        totalDonations: 0,
        activeFundraisers: 0,
        totalStudents: 0,
        successRate: 0
    });
    const [recentDonations, setRecentDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/admin/stats', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch analytics data');
                }

                const data = await res.json();
                setStats({
                    totalDonations: data.totalDonations || 0,
                    activeFundraisers: data.pendingFunds || 0,
                    totalStudents: data.totalStudents || 0,
                    successRate: data.successRate || 0
                });

                // Fetch recent donations
                const donationsRes = await fetch('http://localhost:5000/api/admin/recent-donations', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (donationsRes.ok) {
                    const donationsData = await donationsRes.json();
                    setRecentDonations(donationsData);
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching analytics:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading analytics...</div>
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

    const statItems = [
        {
            label: 'Total Donations',
            value: formatCurrency(stats.totalDonations),
            change: '+12.5%',
            icon: <TrendingUpIcon className="text-green-500" size={20} />,
        },
        {
            label: 'Active Fundraisers',
            value: stats.activeFundraisers,
            change: '+3',
            icon: <GiftIcon className="text-yellow-500" size={20} />,
        },
        {
            label: 'Total Students',
            value: stats.totalStudents,
            change: '+8',
            icon: <UsersIcon className="text-blue-500" size={20} />,
        },
        {
            label: 'Success Rate',
            value: `${stats.successRate}%`,
            change: '+2.4%',
            icon: <BarChart2Icon className="text-purple-500" size={20} />,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold mb-2">Analytics Dashboard</h2>
                <p className="text-gray-600">Overview of platform performance</p>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-600 text-sm">{stat.label}</p>
                                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                            </div>
                            {stat.icon}
                        </div>
                        <div className="mt-2">
                            <span className="text-green-600 text-sm">{stat.change}</span>
                            <span className="text-gray-600 text-sm"> vs last month</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* Recent Donations */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                    <h3 className="font-medium">Recent Donations</h3>
                </div>
                <div className="divide-y">
                    {recentDonations.map((donation, index) => (
                        <div key={index} className="p-4 flex items-center justify-between">
                            <div>
                                <p className="font-medium">{donation.donor}</p>
                                <p className="text-sm text-gray-600">
                                    Donated to {donation.fund}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-green-600">{formatCurrency(donation.amount)}</p>
                                <p className="text-sm text-gray-600">{new Date(donation.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
