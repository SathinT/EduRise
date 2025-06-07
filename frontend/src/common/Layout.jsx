import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from './Sidebar';
import { SearchBar } from './SearchBar';

export function Layout({ children, activeView, onNavigate, userType, onLogout }) {
    return (
        <div className="flex h-screen w-full bg-gray-100">
            <Sidebar
                activeView={activeView}
                onNavigate={onNavigate}
                userType={userType}
            />
            <div className="flex-1 flex flex-col">
                <header className="bg-white p-4 shadow-sm">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="flex justify-between items-center">
                            <SearchBar />
                            <button
                                onClick={onLogout}
                                className="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <div size={18} className="mr-2" />
                                Switch User
                            </button>
                        </div>
                        <h1 className="text-xl font-medium mt-4">Hey There,</h1>
                    </div>
                </header>
                <main className="flex-1 p-4 overflow-auto">
                    <div className="max-w-7xl mx-auto w-full bg-white rounded-lg shadow-sm p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    activeView: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
};
