import React, { useState, useEffect } from 'react';
import { PlusIcon, ImageIcon, VideoIcon } from 'lucide-react'
import { SuccessStory } from './SuccessStory';

export function SuccessView() {
    const [view, setView] = useState('list')
    const [selectedFund, setSelectedFund] = useState(null)
    const [completedFunds, setCompletedFunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletedFunds = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/funding/student', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    // Only show funds that are completed and approved
                    const completed = data.filter(fund => 
                        fund.status === 'Completed' && 
                        fund.approved === true
                    );
                    console.log('Completed funds:', completed); // Debug log
                    setCompletedFunds(completed);
                } else {
                    setError(data.message || 'Failed to fetch funds');
                }
            } catch (err) {
                console.error('❌ Failed to fetch completed funds', err);
                setError('Failed to fetch funds');
            } finally {
                setLoading(false);
            }
        };

        fetchCompletedFunds();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading your completed funds...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
            </div>
        );
    }

    if (view === 'story' && selectedFund) {
        return (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Add Success Story</h2>
                    <button
                        onClick={() => setView('list')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ← Back to list
                    </button>
                </div>
                <AddMediaForm 
                    fund={selectedFund} 
                    onBack={() => setView('list')} 
                />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold">Success Stories</h2>
                        <p className="text-gray-600 mt-1">
                            Share media and impact of your completed funds
                        </p>
                    </div>
                </div>
                {completedFunds.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No completed funds yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {completedFunds.map((fund) => (
                            <div
                                key={fund._id}
                                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => {
                                    setSelectedFund(fund);
                                    setView('story');
                                }}
                            >
                                {fund.images && fund.images.length > 0 ? (
                                    <div className="aspect-video bg-gray-100">
                                        <img
                                            src={`http://localhost:5000/uploads/${fund.images[0]}`}
                                            alt={fund.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-400">No image available</span>
                                    </div>
                                )}
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="font-medium text-lg">{fund.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            Completed on {new Date(fund.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Raised: {new Intl.NumberFormat('en-LK', {
                                                style: 'currency',
                                                currency: 'LKR',
                                                maximumFractionDigits: 0
                                            }).format(fund.raisedAmount)}
                                        </span>
                                        <span className="text-blue-500 text-sm font-medium">
                                            View Story →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function SuccessCard({ fund, onAddMedia }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {fund.hasMedia ? (
                <div className="aspect-video bg-gray-100">
                    <img
                        src={fund.imageUrl}
                        alt={fund.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <button
                        onClick={onAddMedia}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                        <PlusIcon size={18} />
                        Add Event Media
                    </button>
                </div>
            )}
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="font-medium text-lg">{fund.title}</h3>
                    <p className="text-sm text-gray-500">Completed on {fund.date}</p>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Raised: {fund.amount}</span>
                    {fund.hasMedia ? (
                        <button
                            onClick={onAddMedia}
                            className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                        >
                            Add More Media
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

function AddMediaForm({ fund, onBack }) {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [impact, setImpact] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!impact.trim()) {
            setError('Please add an impact statement');
            return;
        }

        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");

        const formData = new FormData();
        images.forEach((file) => formData.append("images", file));
        videos.forEach((file) => formData.append("videos", file));
        formData.append("impact", impact.trim());

        try {
            console.log('Submitting form with:', {
                impact: impact.trim(),
                imagesCount: images.length,
                videosCount: videos.length
            });

            const res = await fetch(`http://localhost:5000/api/funding/${fund._id}/media`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                alert("✅ Media and impact updated successfully!");
                onBack(); // go back to list
            } else {
                setError(data.message || "Failed to update media and impact");
            }
        } catch (err) {
            console.error("❌ Upload error", err);
            setError("Failed to update media and impact");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files)
        switch (type) {
            case 'images':
                setImages((prev) => [...prev, ...files])
                break
            case 'videos':
                setVideos((prev) => [...prev, ...files])
                break
        }
    }

    const removeFile = (index, type) => {
        switch (type) {
            case 'images':
                setImages((prev) => prev.filter((_, i) => i !== index))
                break
            case 'videos':
                setVideos((prev) => prev.filter((_, i) => i !== index))
                break
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    {error}
                </div>
            )}
            
            <div className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Impact Statement *</span>
                    <textarea
                        value={impact}
                        onChange={(e) => setImpact(e.target.value)}
                        placeholder="Describe the impact of this fund..."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                        rows={4}
                        required
                    />
                </label>

                <div className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Images (up to 5)</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFileChange(e, 'images')}
                            className="mt-1 block w-full"
                        />
                    </label>
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {images.map((file, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index, 'images')}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Videos (up to 2)</span>
                        <input
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={(e) => handleFileChange(e, 'videos')}
                            className="mt-1 block w-full"
                        />
                    </label>
                    {videos.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {videos.map((file, index) => (
                                <div key={index} className="relative">
                                    <video
                                        src={URL.createObjectURL(file)}
                                        className="w-full h-32 object-cover rounded"
                                        controls
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index, 'videos')}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
