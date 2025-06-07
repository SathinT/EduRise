import React from 'react';
import { SearchIcon } from 'lucide-react';

export function SearchBar() {
    return (
        <div className="relative w-full max-w-sm">
            <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 hover:shadow-md"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-gray-400" />
            </div>
        </div>
    );
}
