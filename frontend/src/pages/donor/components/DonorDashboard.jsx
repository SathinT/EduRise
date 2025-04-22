import React from 'react'
import { DataTable } from '../../admin/interface/components/DataTable.jsx'
export function DonorDashboard() {
    const stats = [
        {
            number: '02',
            label: 'Total Donations',
            color: 'bg-yellow-500',
        },
    ]
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-md shadow-sm p-6 flex flex-col items-center justify-center"
                    >
                        <div
                            className={`${stat.color} text-white text-3xl font-bold rounded-full w-16 h-16 flex items-center justify-center mb-2`}
                        >
                            {stat.number}
                        </div>
                        <div className="text-center text-gray-700">{stat.label}</div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Thank Notes Received</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Placeholder for thank notes */}
                    <div className="border rounded-lg p-4">
                        <p className="text-gray-600">No thank notes yet</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Chat</h2>
                <div className="border rounded-lg p-4 h-64">
                    <p className="text-gray-600">No messages yet</p>
                </div>
            </div>
        </div>
    )
}
