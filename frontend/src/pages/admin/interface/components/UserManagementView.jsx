import React, { useState, useEffect } from 'react'
import { UserCogIcon, PencilIcon, TrashIcon, EyeIcon } from 'lucide-react'
import { DataTable } from '../../../../common/DataTable.jsx'

export function UserManagementView() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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
            header: 'Role',
            accessor: 'role',
            cell: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'admin' ? 'bg-purple-100 text-purple-700' :
                    value === 'student' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                }`}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
            ),
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'active' ? 'bg-green-100 text-green-700' :
                    value === 'inactive' ? 'bg-gray-100 text-gray-700' :
                    'bg-red-100 text-red-700'
                }`}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
            ),
        },
        {
            header: 'Joined Date',
            accessor: 'joinedDate',
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

    const handleView = (user) => {
        setSelectedUser(user);
    };

    const handleEdit = async (user) => {
        setSelectedUser(user);
    };

    const handleDelete = async (user) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:5000/api/admin/users/${user._id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to delete user');
                }

                // Remove the deleted user from the state
                setUsers(users.filter(u => u._id !== user._id));
            } catch (err) {
                setError(err.message);
                console.error('Error deleting user:', err);
            }
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!selectedUser) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/admin/users/${selectedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    role: e.target.role.value,
                    status: e.target.status.value,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to update user');
            }

            const updatedUser = await res.json();
            setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
            setSelectedUser(null);
        } catch (err) {
            setError(err.message);
            console.error('Error updating user:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading users...</div>
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
        <div className="space-y-8">
            <DataTable title="User Management" columns={columns} data={users} />

            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Edit User</h3>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    defaultValue={selectedUser.role}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                >
                                    <option value="student">Student</option>
                                    <option value="donor">Donor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    defaultValue={selectedUser.status}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedUser(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
