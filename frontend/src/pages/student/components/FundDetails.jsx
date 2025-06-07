import React, { useState } from 'react';
import { ArrowLeftIcon, SendIcon, CheckCircle, ImageIcon, X } from 'lucide-react';

export function FundDetails({ fund, onBack }) {
    const [showThankNote, setShowThankNote] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [message, setMessage] = useState('');
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    const donors = fund.donors || [];
    const progress = fund.goalAmount > 0 ? Math.min(100, Math.round((fund.raisedAmount / fund.goalAmount) * 100)) : 0;

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
            formData.append('donorId', selectedDonor.donor);
            if (selectedMedia) {
                formData.append('media', selectedMedia);
            }

            // Log the complete selected donor object
            console.log('👤 Selected donor details:', {
                donor: selectedDonor.donor,
                donorId: selectedDonor.donor,
                amount: selectedDonor.amount,
                date: selectedDonor.date
            });

            // Log the complete fund object
            console.log('💰 Fund details:', {
                id: fund._id,
                title: fund.title,
                donors: fund.donors.map(d => ({
                    donorId: d.donor,
                    amount: d.amount
                }))
            });

            // Log the complete request data
            console.log('📤 Request data:', {
                url: `http://localhost:5000/api/funding/${fund._id}/thank-note`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    message,
                    donorId: selectedDonor.donor,
                    hasMedia: !!selectedMedia
                }
            });

            const res = await fetch(`http://localhost:5000/api/funding/${fund._id}/thank-note`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            console.log('📡 Response status:', res.status);
            const data = await res.json();
            console.log('📦 Response data:', data);

            if (res.ok) {
                // Update the fund with the response data
                if (data.fund) {
                    // Find the updated donor in the response
                    const updatedDonor = data.fund.donors.find(d => d.donor === selectedDonor.donor);
                    if (updatedDonor) {
                        // Update the fund's donors array
                        const updatedDonors = fund.donors.map(d => 
                            d.donor === selectedDonor.donor ? updatedDonor : d
                        );
                        fund.donors = updatedDonors;
                        
                        // Force a re-render by creating a new fund object
                        const updatedFund = { ...fund, donors: updatedDonors };
                        Object.assign(fund, updatedFund);
                    }
                }

                // Close modal and reset form
                setMessage('');
                setSelectedMedia(null);
                setPreviewUrl(null);
                setShowThankNote(false);
                setSelectedDonor(null);
                setStatusMessage('Thank you note sent successfully!');
            } else {
                setStatusMessage(data.message || 'Failed to send thank you note');
            }
        } catch (err) {
            console.error('❌ Error sending thank you note:', err);
            setStatusMessage('Failed to send thank you note');
        }
    };

    const handleMarkComplete = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/funding/${fund._id}/complete`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (res.ok) {
                setStatusMessage('✅ Fund marked as completed successfully');
                setTimeout(() => {
                    onBack(); // Go back to list view
                }, 2000);
            } else {
                setStatusMessage(data.message || 'Failed to mark fund as completed');
            }
        } catch (err) {
            console.error('Error marking fund as complete:', err);
            setStatusMessage('Failed to mark fund as completed');
        }
    };

    if (!fund) {
        return (
            <div className="text-gray-500 p-4">
                ⚠️ No fund selected.
                <button onClick={onBack} className="ml-2 text-blue-500 underline text-sm" >
                    Go back
                </button>
            </div>
        );
    }

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/placeholder-fund.jpg';
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:5000/uploads/${imagePath}`;
    };

    return (
        <div>
            <button
                onClick={onBack}
                className="text-gray-600 mb-4 hover:text-gray-800"
            >
                ← Back to Funds
            </button>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                {fund.images && fund.images.length > 0 && (
                    <div className="relative h-64 w-full">
                        <img
                            src={getImageUrl(fund.images[0])}
                            alt={fund.title}
                            className="w-full h-full object-cover rounded-t-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-fund.jpg';
                            }}
                        />
                    </div>
                )}

                <div className="p-6 space-y-6">
                    <div>
                        <h1 className="text-2xl font-semibold">{fund.title}</h1>
                        <p className="text-gray-600 mt-1">{fund.description}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">LKR {fund.raisedAmount.toLocaleString()} raised</span>
                            <span className="text-gray-600">
                                Target: LKR {fund.goalAmount.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <h3 className="text-lg font-medium">About this Fund</h3>
                        <p className="text-gray-600">{fund.description}</p>
                    </div>

                    {fund.images && fund.images.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium mb-3">Images</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {fund.images.map((image, i) => (
                                    <div key={i} className="relative aspect-video">
                                        <img
                                            src={getImageUrl(image)}
                                            alt={`Fund image ${i + 1}`}
                                            className="w-full h-full object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/placeholder-fund.jpg';
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {fund.videos && fund.videos.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium mb-3">Videos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {fund.videos.map((video, i) => (
                                    <div key={i} className="relative w-full max-w-md mx-auto">
                                        <video
                                            src={getImageUrl(video)}
                                            controls
                                            className="w-full rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {fund.documents && fund.documents.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium mb-3">Supporting Documents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {fund.documents?.map((doc, i) => (
                                    <div key={i} className="border rounded-lg p-4 flex items-center gap-3">
                                        <div className="h-10 w-10 bg-gray-100 rounded"></div>
                                        <div>
                                            <p className="font-medium">{doc}</p>
                                            <p className="text-sm text-gray-600">
                                                <a href={getImageUrl(doc)} target="_blank" rel="noreferrer noopener" className="text-blue-500 underline">View</a>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {fund.donors && fund.donors.length > 0 && (
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium mb-4">Fund Donors</h3>
                            <div className="space-y-4">
                                {fund.donors.map((donation, index) => {
                                    console.log('🎯 Rendering donor:', {
                                        donor: donation.donor,
                                        donorId: donation.donor?._id,
                                        amount: donation.amount
                                    });
                                    
                                    return (
                                        <div key={index} className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50">
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="font-medium">{donation.donor?.name || 'Anonymous Donor'}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(donation.date).toLocaleDateString()}
                                                    </p>
                                                    {donation.thankingOptions && (
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            <span className="font-medium">Thank you preference:</span> {donation.thankingOptions}
                                                        </p>
                                                    )}
                                                </div>
                                                {donation.thankYouNotes && donation.thankYouNotes.length > 0 && (
                                                    <div className="mt-3 space-y-2">
                                                        <p className="text-sm font-medium text-gray-700">Thank You Notes:</p>
                                                        {donation.thankYouNotes.map((note, noteIndex) => (
                                                            <div key={noteIndex} className="bg-gray-50 rounded-lg p-3">
                                                                <p className="text-sm text-gray-600">{note.message}</p>
                                                                {note.media && (
                                                                    <div className="mt-2">
                                                                        {note.media.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                                                            <img
                                                                                src={getImageUrl(note.media)}
                                                                                alt="Thank you media"
                                                                                className="max-h-32 rounded-lg"
                                                                            />
                                                                        ) : (
                                                                            <video
                                                                                src={getImageUrl(note.media)}
                                                                                controls
                                                                                className="max-h-32 rounded-lg"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                )}
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {new Date(note.createdAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <p className="text-lg">LKR {donation.amount.toLocaleString()}</p>
                                                {(!donation.thankYouNotes || donation.thankYouNotes.length === 0) && (
                                                    <button
                                                        onClick={() => {
                                                            console.log('🎯 Setting selected donor:', {
                                                                donor: donation.donor,
                                                                donorId: donation.donor?._id,
                                                                amount: donation.amount
                                                            });
                                                            setSelectedDonor(donation);
                                                            setShowThankNote(true);
                                                        }}
                                                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center gap-1"
                                                    >
                                                        <SendIcon size={16} />
                                                        Send Thank You
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            fund.status === 'Approved'
                                ? 'bg-green-100 text-green-700'
                                : fund.status === 'Rejected'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                        }`}>
                            {fund.status || (fund.approved ? 'Approved' : 'Pending')}
                        </span>
                        {fund.approved && fund.status !== 'Completed' && (
                            <button
                                onClick={handleMarkComplete}
                                className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 flex items-center gap-1"
                            >
                                <CheckCircle size={16} />
                                Mark as Complete
                            </button>
                        )}
                    </div>

                    {statusMessage && (
                        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-md text-sm mt-4">
                            {statusMessage}
                        </div>
                    )}
                </div>
            </div>

            {/* Thank You Note Modal */}
            {showThankNote && selectedDonor && (
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
                                    setShowThankNote(false);
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
                                        setShowThankNote(false);
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
