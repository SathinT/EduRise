import React, { useState, useEffect } from 'react';

const FundraisingApproval = () => {
    const [fundraisingProfiles, setFundraisingProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [studentDetails, setStudentDetails] = useState(null);
    const [showStudentDetails, setShowStudentDetails] = useState(false);

    useEffect(() => {
        fetchFundraisingProfiles();
    }, []);

    const fetchFundraisingProfiles = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/fundraising/pending', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setFundraisingProfiles(data);
            } else {
                setError('Failed to fetch fundraising profiles');
            }
        } catch (error) {
            setError('Error fetching fundraising profiles');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (profileId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/fundraising/${profileId}/approve`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                // Refresh the list after approval
                fetchFundraisingProfiles();
            } else {
                setError('Failed to approve fundraising profile');
            }
        } catch (error) {
            setError('Error approving fundraising profile');
            console.error('Error:', error);
        }
    };

    const handleReject = async (profileId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/fundraising/${profileId}/reject`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                // Refresh the list after rejection
                fetchFundraisingProfiles();
            } else {
                setError('Failed to reject fundraising profile');
            }
        } catch (error) {
            setError('Error rejecting fundraising profile');
            console.error('Error:', error);
        }
    };

    const handleViewDetails = async (profile) => {
        setSelectedProfile(profile);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/student/profile/${profile.student}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setStudentDetails(data);
                setShowStudentDetails(true);
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    const handleCloseDetails = () => {
        setSelectedProfile(null);
        setStudentDetails(null);
        setShowStudentDetails(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Fundraising Approval</h2>
            
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading profiles...</div>
                </div>
            ) : (
                <div className="space-y-6">
                    {fundraisingProfiles.map((profile) => (
                        <div key={profile._id} className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{profile.title}</h3>
                                    <p className="text-gray-600">By {profile.studentName}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleViewDetails(profile)}
                                        className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleApprove(profile._id)}
                                        className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(profile._id)}
                                        className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{profile.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Amount Needed:</span> ${profile.amountNeeded}
                                </div>
                                <div>
                                    <span className="font-medium">Category:</span> {profile.category}
                                </div>
                                <div>
                                    <span className="font-medium">Status:</span> {profile.status}
                                </div>
                                <div>
                                    <span className="font-medium">Created:</span> {new Date(profile.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Student Details Modal */}
            {showStudentDetails && studentDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold">Student Details</h3>
                                <button
                                    onClick={handleCloseDetails}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-700">Personal Information</h4>
                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Full Name</p>
                                            <p className="font-medium">{studentDetails.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Date of Birth</p>
                                            <p className="font-medium">{new Date(studentDetails.dateOfBirth).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Gender</p>
                                            <p className="font-medium capitalize">{studentDetails.gender}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Contact Number</p>
                                            <p className="font-medium">{studentDetails.contactNumber}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700">Education</h4>
                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Institution</p>
                                            <p className="font-medium">{studentDetails.education?.institution}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Degree</p>
                                            <p className="font-medium">{studentDetails.education?.degree}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Field of Study</p>
                                            <p className="font-medium">{studentDetails.education?.fieldOfStudy}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700">Documents</h4>
                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                        {studentDetails.documents?.map((doc, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <a
                                                    href={`http://localhost:5000/${doc}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 truncate"
                                                >
                                                    {doc.split('/').pop()}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FundraisingApproval; 