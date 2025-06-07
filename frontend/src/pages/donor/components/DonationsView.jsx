import React, { useState, useEffect } from 'react';
import { DataTable } from '../../../common/DataTable.jsx';
import { GiftIcon, TrendingUpIcon, UsersIcon, RefreshCw } from 'lucide-react';

export function DonationsView() {
    const [stats, setStats] = useState({
        totalDonations: 0,
        amountDonated: 0,
        studentsSupported: 0
    });
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');

            // Fetch stats
            const statsRes = await fetch('http://localhost:5000/api/donor/stats', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const statsData = await statsRes.json();
            if (statsRes.ok) {
                setStats({
                    totalDonations: statsData.totalDonations || 0,
                    amountDonated: statsData.amountDonated || 0,
                    studentsSupported: statsData.studentsSupported || 0
                });
            } else {
                setError(statsData.message || 'Failed to fetch stats');
            }

            // Fetch donations
            const donationsRes = await fetch('http://localhost:5000/api/donor/donations', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const donationsData = await donationsRes.json();
            if (donationsRes.ok) {
                setDonations(donationsData);
            } else {
                setError(donationsData.message || 'Failed to fetch donations');
            }
        } catch (err) {
            setError('Network error while fetching data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    // Initial fetch only
    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchData();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'LKR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const statItems = [
        {
            number: stats.totalDonations,
            label: 'Total Donations',
            color: 'bg-yellow-500',
            icon: <GiftIcon size={24} className="text-white" />
        },
        {
            number: formatCurrency(stats.amountDonated),
            label: 'Amount Donated',
            color: 'bg-green-500',
            icon: <TrendingUpIcon size={24} className="text-white" />
        },
        {
            number: stats.studentsSupported,
            label: 'Students Supported',
            color: 'bg-blue-500',
            icon: <UsersIcon size={24} className="text-white" />
        }
    ];

    const columns = [
        {
            header: 'Student',
            accessor: 'studentName',
        },
        {
            header: 'Fund',
            accessor: 'fundTitle',
        },
        {
            header: 'Amount',
            accessor: 'amount',
            cell: (value) => formatCurrency(value)
        },
        {
            header: 'Date',
            accessor: 'date',
            cell: (value) => new Date(value).toLocaleDateString()
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'Completed' ? 'bg-green-100 text-green-800' :
                    value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {value}
                </span>
            )
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading donations...</div>
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
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold mb-2">My Donations</h2>
                    <p className="text-gray-600">Overview of your contributions</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                    title="Refresh donations"
                >
                    <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                    <h3 className="font-medium">Recent Donations</h3>
                </div>
                <DataTable columns={columns} data={donations} />
            </div>
        </div>
    );
}
