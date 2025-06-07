import React from 'react'
import logo from '../assets/Home/Logo.png'
import {
    ActivityIcon,
    UsersIcon,
    HeartIcon,
    GiftIcon,
    FileTextIcon,
    MessageSquareIcon,
    ShieldIcon,
    BarChart2Icon,
    UserCogIcon,
} from 'lucide-react'

export function Sidebar({ activeView, onNavigate, userType }) {
    const adminMenuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <ActivityIcon size={18} />,
        },
        {
            id: 'verifications',
            label: 'Profile Verifications',
            icon: <ShieldIcon size={18} />,
        },
        {
            id: 'fundraising',
            label: 'Fundraising Approval',
            icon: <GiftIcon size={18} />,
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: <BarChart2Icon size={18} />,
        },
        {
            id: 'users',
            label: 'User Management',
            icon: <UserCogIcon size={18} />,
        },
        {
            id: 'students',
            label: 'Students',
            icon: <UsersIcon size={18} />,
        },
        {
            id: 'donors',
            label: 'Donors',
            icon: <HeartIcon size={18} />,
        },
    ];

    const studentMenuItems = [
        {
            id: 'funds',
            label: 'Active Funds',
            icon: <GiftIcon size={18} />,
        },
        {
            id: 'profile',
            label: 'My Profile',
            icon: <UsersIcon size={18} />,
        },
        {
            id: 'success',
            label: 'Success Stories',
            icon: <FileTextIcon size={18} />,
        },
        {
            id: 'chat',
            label: 'Chat',
            icon: <MessageSquareIcon size={18} />,
        },
    ]
    const donorMenuItems = [
        {
            id: 'browse',
            label: 'Browse Funds',
            icon: <GiftIcon size={18} />,
        },
        {
            id: 'donations',
            label: 'My Donations',
            icon: <HeartIcon size={18} />,
        },
        {
            id: 'thanknotes',
            label: 'Thank Notes',
            icon: <FileTextIcon size={18} />,
        },
        {
            id: 'success',
            label: 'Success Stories',
            icon: <FileTextIcon size={18} />,
        },
        {
            id: 'chat',
            label: 'Chat',
            icon: <MessageSquareIcon size={18} />,
        },
    ]

    const menuItems = {
        admin: adminMenuItems,
        student: studentMenuItems,
        donor: donorMenuItems,
    }[userType] || [];


    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center">
                <img src={logo} alt="Logo" className="w-36 h-10 mr-2" />
            </div>
            <nav className="flex-1 pt-4">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => onNavigate(item.id)}
                                className={`flex items-center w-full px-4 py-3 text-sm hover:bg-gray-800 ${
                                    activeView === item.id ? 'bg-gray-800' : ''
                                }`}
                            >
                                <span className="mr-3 text-gray-400">{item.icon}</span>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 text-xs text-gray-500">
                {userType.charAt(0).toUpperCase() + userType.slice(1)}_dashboard
            </div>
        </div>
    )
}
