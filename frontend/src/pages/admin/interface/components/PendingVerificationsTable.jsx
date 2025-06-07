import React from 'react'
import { DataTable } from '../../../../common/DataTable.jsx'
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
        },
    ]
    const data = [
        {
            name: 'Michael Brown',
            email: 'michael@example.com',
            submissionDate: '2023-07-01',
            actions: 'Verify',
        },
        {
            name: 'Emily Davis',
            email: 'emily@example.com',
            submissionDate: '2023-07-02',
            actions: 'Verify',
        },
        // More sample data would go here
    ]
    return (
        <DataTable title="Pending Verifications" columns={columns} data={data} />
    )
}
