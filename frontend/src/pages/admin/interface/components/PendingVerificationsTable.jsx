import React from 'react';
import { DataTable } from './DataTable.jsx';

export function PendingVerificationsTable() {
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
            header: 'Submission Date',
            accessor: 'submissionDate',
        },
        {
            header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                <Button
                    variant="outline"
                    className="text-yellow-600 border-yellow-500 hover:bg-yellow-500 hover:text-black transition"
                    onClick={() => handleVerify(row.original)}
                >
                    Verify
                </Button>
                </div>
            ),
        },
    ];

    const data = [
        {
            name: 'Michael Brown',
            email: 'michael@example.com',
            submissionDate: '2023-07-01',
        },
        {
            name: 'Emily Davis',
            email: 'emily@example.com',
            submissionDate: '2023-07-02',
        },
    ];

    const handleVerify = (user) => {
        console.log('Verifying:', user);
        alert(`Verification sent for ${user.name}`);
        // You can update the backend or state here
    };

    return (
        <DataTable
            title="Pending Verifications"
            columns={columns}
            data={data}
        />
    );
}
