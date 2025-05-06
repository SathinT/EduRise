import React from 'react';
import {Link} from "react-router-dom";

export default function DonationCard({ imageUrl, title, heldBy, campusName }) {
    return (
        <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="h-40 overflow-hidden relative">
                <img
                    src={imageUrl}
                    alt="Graduation ceremony"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-2">
                    <div className="bg-gray-800 text-white py-1 px-2 text-xs font-bold">
                        {campusName}
                    </div>
                </div>
            </div>
            <div className="p-3">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-yellow-400 text-sm mb-3">
                    Held by: {heldBy}
                </p>
                <div className="flex space-x-2">
                    <Link to="/donationDetails" className="bg-gray-600 text-white text-sm py-1 px-3 rounded hover:bg-gray-500">
                        View More
                    </Link>
                    <Link to="/register" className="bg-yellow-400 text-gray-900 text-sm py-1 px-3 rounded font-medium hover:bg-yellow-300">
                        Donate Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
