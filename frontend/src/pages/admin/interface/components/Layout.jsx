import React from 'react';
import { Sidebar } from './Sidebar';
import { SearchBar } from './SearchBar';
import { LogOutIcon } from 'lucide-react';

export function Layout({ children, activeView, onNavigate, userType, onLogout }) {
    return (
        <div className="flex h-screen w-full bg-gray-100">
            <Sidebar
                activeView={activeView}
                onNavigate={onNavigate}
                userType={userType}
            />

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white p-4 shadow-sm">
                    <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                        <SearchBar />
                    </div>
                    <h1 className="text-xl font-medium mt-4">
                        Hey {userType.charAt(0).toUpperCase() + userType.slice(1)},
                    </h1>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 overflow-auto">
                    <div className="max-w-7xl mx-auto w-full bg-white rounded-lg shadow-sm p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
