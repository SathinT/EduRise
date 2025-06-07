import React, { useState, useEffect } from 'react';
import { ActivityIcon, UsersIcon, HeartIcon, FileTextIcon, GiftIcon, TrendingUpIcon, BarChart2Icon } from 'lucide-react';

export function DashboardStats() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalDonors: 0,
        pendingVerifications: 0,
        pendingFunds: 0,
        pendingImpact: 0,
        totalDonations: 0,
        successRate: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/admin/stats', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    setStats({
                        totalStudents: data.totalStudents || 0,
                        totalDonors: data.totalDonors || 0,
                        pendingVerifications: data.pendingVerifications || 0,
                        pendingFunds: data.pendingFunds || 0,
                        pendingImpact: data.pendingImpact || 0,
                        totalDonations: data.totalDonations || 0,
                        successRate: data.successRate || 0
                    });
                } else {
                    setError(data.message || 'Failed to fetch stats');
                }
            } catch (err) {
                setError('Network error while fetching stats');
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'LKR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const statItems = [
        {
            number: stats.totalStudents,
            label: 'Total Students',
            color: 'bg-yellow-500',
            icon: <UsersIcon size={24} className="text-white" />
        },
        {
            number: stats.totalDonors,
            label: 'Total Donors',
            color: 'bg-blue-500',
            icon: <HeartIcon size={24} className="text-white" />
        },
        {
            number: formatCurrency(stats.totalDonations),
            label: 'Total Donations',
            color: 'bg-green-500',
            icon: <TrendingUpIcon size={24} className="text-white" />
        },
        {
            number: `${stats.successRate}%`,
            label: 'Success Rate',
            color: 'bg-purple-500',
            icon: <BarChart2Icon size={24} className="text-white" />
        },
        {
            number: stats.pendingVerifications,
            label: 'Pending Verifications',
            color: 'bg-gray-800',
            icon: <FileTextIcon size={24} className="text-white" />
        },
        {
            number: stats.pendingFunds,
            label: 'Pending Funds',
            color: 'bg-indigo-500',
            icon: <GiftIcon size={24} className="text-white" />
        },
        {
            number: stats.pendingImpact,
            label: 'Pending Impact',
            color: 'bg-red-500',
            icon: <ActivityIcon size={24} className="text-white" />
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading stats...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Key metrics and statistics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {statItems.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
