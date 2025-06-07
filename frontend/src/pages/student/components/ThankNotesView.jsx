import React, { useState, useEffect } from 'react';
import { PlusIcon, SendIcon, ImageIcon, MessageSquare, X } from 'lucide-react';

export function ThankNotesView() {
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [message, setMessage] = useState('');
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/funding/student', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    // Filter funds that have received donations
                    const fundedFunds = data.filter(fund => fund.donors && fund.donors.length > 0);
                    setFunds(fundedFunds);
                }
            } catch (err) {
                console.error('Failed to fetch funds:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFunds();
    }, []);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedMedia(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSendThankNote = async (e) => {
        e.preventDefault();
        if (!selectedDonor || (!message.trim() && !selectedMedia)) return;

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('message', message);
            formData.append('donorId', selectedDonor.donor._id);
            if (selectedMedia) {
                formData.append('media', selectedMedia);
            }

            const res = await fetch(`http://localhost:5000/api/funding/${selectedDonor.fundId}/thank-note`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                alert('Thank you note sent successfully!');
                setMessage('');
                setSelectedMedia(null);
                setPreviewUrl(null);
                setSelectedDonor(null);
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to send thank you note');
            }
        } catch (err) {
            console.error('Error sending thank you note:', err);
            alert('Failed to send thank you note');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold">Thank Your Donors</h2>
                <p className="text-gray-600 mt-1">
                    Show your appreciation to the donors who supported your cause
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {funds.map((fund) => (
                    <div
                        key={fund._id}
                        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                    >
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-lg">{fund.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {fund.donors?.length || 0} donors supported this fund
                                </p>
                            </div>
                            <div className="space-y-2">
                                {fund.donors?.map((donation, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                        onClick={() => setSelectedDonor({ ...donation, fundId: fund._id })}
                                    >
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">{donation.donor.name}</span>
                                            {donation.thankingOptions && (
                                                <span className="ml-2">
                                                    • Preferred: {donation.thankingOptions}
                                                </span>
                                            )}
                                        </div>
                                        <MessageSquare size={18} className="text-yellow-500" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Raised: LKR {fund.raisedAmount?.toLocaleString() || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Thank You Note Modal */}
            {selectedDonor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-medium text-lg">Send Thank You Note</h3>
                                <p className="text-sm text-gray-500">
                                    To: {selectedDonor.donor.name}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedDonor(null);
                                    setMessage('');
                                    setSelectedMedia(null);
                                    setPreviewUrl(null);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSendThankNote} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Thank You Message
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                    rows={4}
                                    placeholder="Write a heartfelt thank you message..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Add Media (Optional)
                                </label>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <label className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                            <ImageIcon size={18} />
                                            <span>Upload Image/Video</span>
                                            <input
                                                type="file"
                                                accept="image/*,video/*"
                                                onChange={handleMediaChange}
                                                className="hidden"
                                            />
                                        </label>
                                        {selectedMedia && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedMedia(null);
                                                    setPreviewUrl(null);
                                                }}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    {previewUrl && (
                                        <div className="mt-2">
                                            {selectedMedia.type.startsWith('image/') ? (
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="max-h-48 rounded-lg"
                                                />
                                            ) : (
                                                <video
                                                    src={previewUrl}
                                                    controls
                                                    className="max-h-48 rounded-lg"
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedDonor(null);
                                        setMessage('');
                                        setSelectedMedia(null);
                                        setPreviewUrl(null);
                                    }}
                                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center gap-2"
                                >
                                    <SendIcon size={18} />
                                    Send Thank You
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 