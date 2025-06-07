import React, { useState, useEffect } from 'react'
import { DataTable } from '../../../../common/DataTable.jsx'
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-react'

export function StudentsTable() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/admin/students', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch students');
                }

                const data = await res.json();
                setStudents(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching students:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
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
            header: 'University',
            accessor: 'university',
        },
        {
            header: 'Verification Status',
            accessor: 'verificationStatus',
            cell: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'verified' ? 'bg-green-100 text-green-700' :
                    value === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                }`}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
            ),
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

    const handleView = (student) => {
        // Implement view student details
        console.log('View student:', student);
    };

    const handleEdit = (student) => {
        // Implement edit student
        console.log('Edit student:', student);
    };

    const handleDelete = async (student) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:5000/api/admin/students/${student._id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to delete student');
                }

                // Remove the deleted student from the state
                setStudents(students.filter(s => s._id !== student._id));
            } catch (err) {
                setError(err.message);
                console.error('Error deleting student:', err);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading students...</div>
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

    return <DataTable title="Students" columns={columns} data={students} />;
}
