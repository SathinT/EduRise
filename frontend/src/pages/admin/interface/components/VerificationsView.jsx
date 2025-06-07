import React, { useState, useEffect } from 'react';
import { Check, X, FileText, User } from 'lucide-react';

export function VerificationsView() {
    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [verificationNote, setVerificationNote] = useState('');

    useEffect(() => {
        fetchVerifications();
    }, []);

    const fetchVerifications = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/student/verifications', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setVerifications(data);
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to fetch verifications');
            }
        } catch (error) {
            setError('Failed to fetch verifications');
            console.error('Error fetching verifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (profileId, status) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/student/verifications/${profileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status,
                    note: verificationNote,
                }),
            });

            if (res.ok) {
                setVerifications(prev => prev.filter(p => p._id !== profileId));
                setSelectedProfile(null);
                setVerificationNote('');
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to verify profile');
            }
        } catch (error) {
            setError('Failed to verify profile');
            console.error('Error verifying profile:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading verifications...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Student Verifications</h2>
                <p className="text-gray-600">
                    Review and verify student profiles and their submitted documents.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b">
                            <h3 className="text-lg font-medium">Pending Verifications</h3>
                        </div>
                        <div className="divide-y">
                            {verifications.length === 0 ? (
                                <div className="p-4 text-center text-gray-500">
                                    No pending verifications
                                </div>
                            ) : (
                                verifications.map(profile => (
                                    <button
                                        key={profile._id}
                                        onClick={() => setSelectedProfile(profile)}
                                        className={`w-full p-4 text-left hover:bg-gray-50 ${
                                            selectedProfile?._id === profile._id ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <User className="w-5 h-5 text-gray-500 mr-3" />
                                            <div>
                                                <div className="font-medium">{profile.fullName}</div>
                                                <div className="text-sm text-gray-500">
                                                    {profile.education?.institution}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {selectedProfile ? (
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">
                                            {selectedProfile.fullName}
                                        </h3>
                                        <p className="text-gray-600">
                                            {selectedProfile.education?.institution}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleVerify(selectedProfile._id, 'verified')}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleVerify(selectedProfile._id, 'rejected')}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                                            Personal Information
                                        </h4>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-gray-500">Date of Birth:</span>
                                                <p>{new Date(selectedProfile.dateOfBirth).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Gender:</span>
                                                <p>{selectedProfile.gender}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Contact:</span>
                                                <p>{selectedProfile.contactNumber}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Address:</span>
                                                <p>{typeof selectedProfile.address === 'object' ? selectedProfile.address.street : selectedProfile.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                                            Education Details
                                        </h4>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-gray-500">Degree:</span>
                                                <p>{selectedProfile.education?.degree}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Field of Study:</span>
                                                <p>{selectedProfile.education?.fieldOfStudy}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                                        Submitted Documents
                                    </h4>
                                    {selectedProfile.documents && selectedProfile.documents.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            {selectedProfile.documents.map((doc, index) => {
                                                const fileName = doc.split('/').pop();
                                                const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileName);
                                                const fileUrl = `http://localhost:5000/uploads/${fileName}`;
                                                
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex flex-col p-4 bg-gray-50 rounded-lg"
                                                    >
                                                        {isImage ? (
                                                            <div className="mb-2">
                                                                <img
                                                                    src={fileUrl}
                                                                    alt={fileName}
                                                                    className="w-full h-32 object-cover rounded"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <FileText className="w-5 h-5 text-gray-500 mb-2" />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm text-gray-700 truncate">
                                                                {fileName}
                                                            </p>
                                                            <div className="flex space-x-2 mt-1">
                                                                <a
                                                                    href={fileUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-blue-600 hover:underline"
                                                                >
                                                                    View
                                                                </a>
                                                                <a
                                                                    href={fileUrl}
                                                                    download
                                                                    className="text-xs text-green-600 hover:underline"
                                                                >
                                                                    Download
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                                            <p className="text-gray-500">No documents submitted yet</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Verification Note
                                    </label>
                                    <textarea
                                        value={verificationNote}
                                        onChange={(e) => setVerificationNote(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        rows="3"
                                        placeholder="Add a note about the verification decision..."
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                            Select a profile to review
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
