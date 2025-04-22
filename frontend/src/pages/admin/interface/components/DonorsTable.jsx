import React from 'react';
import { DataTable } from './DataTable.jsx';

export function DonorsTable() {
    const handleView = (donor) => {
        alert(`Viewing details for ${donor.name}`);
        // You can also navigate or open a modal here
    };

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
            header: 'Date Joined',
            accessor: 'dateJoined',
        },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => (
                <button
                    onClick={() => handleView(row)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
                >
                    View
                </button>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            name: 'Robert Johnson',
            email: 'robert@example.com',
            dateJoined: '2023-04-15',
            actions: 'Delete',
        },
        {
            id: 2,
            name: 'Sarah Williams',
            email: 'sarah@example.com',
            dateJoined: '2023-05-20',
            actions: 'Delete',
        },
    ];

    return <DataTable title="Donors" columns={columns} data={data} />;
}
