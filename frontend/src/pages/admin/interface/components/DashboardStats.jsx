import React from 'react';

export function DashboardStats() {
    const stats = [
        {
            number: '40',
            label: 'Total Students',
            color: 'bg-yellow-500',
        },
        {
            number: '38',
            label: 'Total Donors',
            color: 'bg-yellow-500',
        },
        {
            number: '02',
            label: 'Pending Verifications',
            color: 'bg-gray-800',
        },
        {
            number: '01',
            label: 'Pending Profile',
            color: 'bg-gray-800',
        },
        {
            number: '05',
            label: 'Pending Impact',
            color: 'bg-gray-800',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center transition-transform hover:scale-105"
                >
                    <div
                        className={`${stat.color} text-white text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow-inner`}
                    >
                        {stat.number}
                    </div>
                    <div className="text-center text-gray-600 font-medium">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}
