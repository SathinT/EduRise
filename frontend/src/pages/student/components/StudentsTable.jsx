import React from 'react'
import { DataTable } from '../../admin/interface/components/DataTable.jsx'
export function StudentsTable() {
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
        },
    ]
    const data = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            dateJoined: '2023-05-12',
            actions: 'View',
        },
        {
            name: 'Jane Smith',
            email: 'jane@example.com',
            dateJoined: '2023-06-01',
            actions: 'View',
        },
        // More sample data would go here
    ]
    return <DataTable title="Students" columns={columns} data={data} />
}
