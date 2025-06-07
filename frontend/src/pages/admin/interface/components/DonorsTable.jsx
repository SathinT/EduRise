import React, { useState, useEffect } from 'react'
import { DataTable } from '../../../../common/DataTable.jsx'
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react'

export function DonorsTable() {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/admin/donors', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch donors');
                }

                const data = await res.json();
                setDonors(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching donors:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDonors();
    }, []);

    const columns = [
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Total Donations',
            accessor: 'totalDonations',
            cell: (value) => new Intl.NumberFormat('en-LK', {
                style: 'currency',
                currency: 'LKR',
                maximumFractionDigits: 0
            }).format(value),
        },
        {
            header: 'Date Joined',
            accessor: 'dateJoined',
            cell: (value) => new Date(value).toLocaleDateString(),
        },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleView(row)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                    >
                        <EyeIcon size={18} />
                    </button>
                    <button
                        onClick={() => handleEdit(row)}
                        className="p-1 text-yellow-600 hover:text-yellow-800"
                    >
                        <PencilIcon size={18} />
                    </button>
                    <button
                        onClick={() => handleDelete(row)}
                        className="p-1 text-red-600 hover:text-red-800"
                    >
                        <TrashIcon size={18} />
                    </button>
                </div>
            ),
        },
    ];

    const handleView = (donor) => {
        // Implement view donor details
        console.log('View donor:', donor);
    };

    const handleEdit = (donor) => {
        // Implement edit donor
        console.log('Edit donor:', donor);
    };

    const handleDelete = async (donor) => {
        if (window.confirm('Are you sure you want to delete this donor?')) {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:5000/api/admin/donors/${donor._id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to delete donor');
                }

                // Remove the deleted donor from the state
                setDonors(donors.filter(d => d._id !== donor._id));
            } catch (err) {
                setError(err.message);
                console.error('Error deleting donor:', err);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading donors...</div>
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

    return <DataTable title="Donors" columns={columns} data={donors} />;
}
