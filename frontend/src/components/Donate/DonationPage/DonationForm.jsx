import React from 'react';
import { useNavigate } from 'react-router-dom';


const DonationForm = () => {
    const organizer = 'Arts Students Of University Of ABC';
    const eventName = 'Sarigama Sajje';
    const eventType = 'Musical Event';
    const goalAmount = 'Lkr. 80,000.00/=';
    const achievedPercentage = '60%';

    const navigate = useNavigate();


    return (
        <div className="w-full mb-10">
            <h2 className="text-3xl font-bold text-center mb-10 pt-10">
                Make Your Donation
            </h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-900 p-8 rounded-lg">
                {/* Event Details */}
                <div className="text-white">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold">Organized By</h3>
                        <p className="text-yellow-400">{organizer}</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold">Event</h3>
                        <p className="text-yellow-400">{eventName}</p>
                        <p className="text-yellow-400">({eventType})</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold">Goal</h3>
                        <p className="text-yellow-400">{goalAmount}</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Achieved</h3>
                        <p className="text-yellow-400">{achievedPercentage}</p>
                    </div>
                </div>

                {/* Donation Input Form */}
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Donation Amount"
                        className="p-3 border border-yellow-400 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                        type="text"
                        placeholder="Payment Method"
                        className="p-3 border border-yellow-400 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <textarea
                        placeholder="Any preferred thanking options"
                        className="p-3 border border-yellow-400 bg-white text-black rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button className="bg-yellow-400 text-black py-2 px-6 rounded-md w-24 font-medium hover:bg-yellow-300"
                            onClick={() => navigate('/register')}>
                        Donate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonationForm;
