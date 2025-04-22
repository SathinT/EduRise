import React from 'react';
import { DataTable } from './DataTable.jsx';

export function StudentsTable() {
    const handleView = (student) => {
        alert(`Viewing ${student.name}'s details`);
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
            cell: (row) => (
                <button
                    onClick={() => handleView(row.original)}
                    className="text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-black transition px-3 py-1 rounded text-sm"
                >
                    View
                </button>
            ),
        },
    ];

    const data = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            dateJoined: '2023-05-12',
            actions: 'Delete',
        },
        {
            name: 'Jane Smith',
            email: 'jane@example.com',
            dateJoined: '2023-06-01',
            actions: 'Delete',
        },
    ];

    return <DataTable title="Students" columns={columns} data={data} />;
}
