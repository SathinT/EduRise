import React from 'react'
export function ProfileView() {
    return (
        <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-6">My Profile</h2>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
                    <div>
                        <h3 className="font-medium">John Doe</h3>
                        <p className="text-gray-600">Student ID: STU123456</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value="John Doe"
                            className="w-full border rounded-md px-3 py-2"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value="john@example.com"
                            className="w-full border rounded-md px-3 py-2"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value="+1 234 567 8900"
                            className="w-full border rounded-md px-3 py-2"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            University
                        </label>
                        <input
                            type="text"
                            value="Example University"
                            className="w-full border rounded-md px-3 py-2"
                            readOnly
                        />
                    </div>
                </div>
                <div>
                    <h3 className="font-medium mb-3">Educational Details</h3>
                    <div className="border rounded-lg p-4 space-y-4">
                        <div>
                            <p className="text-sm text-gray-600">Current Program</p>
                            <p className="font-medium">
                                Bachelor of Science in Computer Science
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Year of Study</p>
                            <p className="font-medium">2nd Year</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Expected Graduation</p>
                            <p className="font-medium">2025</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    )
}
