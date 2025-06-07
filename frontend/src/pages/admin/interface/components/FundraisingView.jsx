import React, { useState, useEffect } from 'react';
import { CheckIcon, XIcon, EyeIcon, X } from 'lucide-react';

export function FundraisingView() {
    const [pendingFunds, setPendingFunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [selectedFund, setSelectedFund] = useState(null);
    const [showMediaModal, setShowMediaModal] = useState(false);

    useEffect(() => {
        const fetchPendingFunds = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/admin/funding/pending', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok) {
                    console.log('Received fund data:', data);
                    setPendingFunds(data);
                } else {
                    console.error('Error loading funds:', data.message);
                    setMessage(data.message || 'Error loading funds');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setMessage('Failed to load funds. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPendingFunds();
    }, []);

    const handleAction = async (id, action) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/admin/funding/${id}/${action}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (res.ok) {
                console.log('Action response:', data); // Debug log
                setMessage(`✅ Fund ${action}ed successfully`);
                // Only remove from pending list if it was approved/rejected
                if (data.fund && data.fund.status) {
                    setPendingFunds((prev) => prev.filter((fund) => fund._id !== id));
                }
                setSelectedFund(null);
                setTimeout(() => setMessage(''), 3000);
            } else {
                console.error('Action failed:', data);
                setMessage(data.message || 'Failed to update status');
            }
        } catch (err) {
            console.error('Action failed:', err);
            setMessage('Failed to update status. Please try again.');
        }
    };

    const MediaModal = ({ fund, onClose }) => {
        if (!fund) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Media for {fund.title}</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {fund.images && fund.images.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-medium mb-3">Images</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {fund.images.map((image, i) => (
                                            <div key={i} className="aspect-video rounded-lg overflow-hidden">
                                                <img
                                                    src={`http://localhost:5000/uploads/${image}`}
                                                    alt={`Fund image ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {fund.videos && fund.videos.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-medium mb-3">Videos</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {fund.videos.map((video, i) => (
                                            <div key={i} className="aspect-video rounded-lg overflow-hidden">
                                                <video controls className="w-full h-full">
                                                    <source src={`http://localhost:5000/uploads/${video}`} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {fund.documents && fund.documents.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-medium mb-3">Documents</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {fund.documents.map((doc, i) => (
                                            <a
                                                key={i}
                                                href={`http://localhost:5000/uploads/${doc}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 bg-gray-100 text-sm rounded-md hover:bg-gray-200"
                                            >
                                                <EyeIcon size={16} className="mr-2" />
                                                View Document {i + 1}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(!fund.images?.length && !fund.videos?.length && !fund.documents?.length) && (
                                <p className="text-gray-500 text-center py-4">No media available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-2">Fundraising Approval</h2>
                <p className="text-gray-600">Review and approve fundraising requests</p>
                {message && (
                    <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-md text-sm mb-4">
                        {message}
                    </div>
                )}
            </div>

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : (
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 divide-y">
                        {pendingFunds.map((fund) => (
                            <div key={fund._id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-4 flex-1 mr-8">
                                        <div>
                                            <h3 className="text-lg font-medium">{fund.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                By {fund.student?.name || 'Unknown'}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Target Amount:</span>
                                                <span className="ml-2 font-medium">LKR {fund.goalAmount}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Submitted:</span>
                                                <span className="ml-2">
                                                    {new Date(fund.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600">{fund.description}</p>

                                        <button
                                            onClick={() => {
                                                setSelectedFund(fund);
                                                setShowMediaModal(true);
                                            }}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            <EyeIcon size={16} className="mr-2" />
                                            View Media
                                        </button>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAction(fund._id, 'approve')}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                                        >
                                            <CheckIcon size={16} className="mr-1" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleAction(fund._id, 'reject')}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                                        >
                                            <XIcon size={16} className="mr-1" />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showMediaModal && (
                <MediaModal
                    fund={selectedFund}
                    onClose={() => {
                        setShowMediaModal(false);
                        setSelectedFund(null);
                    }}
                />
            )}
        </div>
    );
}
