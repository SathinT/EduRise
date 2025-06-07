import React, { useState } from 'react';
import { ArrowLeftIcon, SendIcon, PlusIcon } from 'lucide-react';

export function SuccessStory({ story, onBack }) {
    const [showAddMedia, setShowAddMedia] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState({
        images: [],
        videos: []
    });
    const [message, setMessage] = useState('');

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/placeholder-fund.jpg';
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:5000/uploads/${imagePath}`;
    };

    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => ({
            ...prev,
            [type]: files
        }));
    };

    const handleAddMedia = async () => {
        try {
            const formData = new FormData();
            selectedFiles.images.forEach(file => {
                formData.append('images', file);
            });
            selectedFiles.videos.forEach(file => {
                formData.append('videos', file);
            });

            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/funding/${story.id}/media`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            const data = await res.json();
            if (res.ok) {
                setMessage('✅ Media added successfully');
                setShowAddMedia(false);
                setSelectedFiles({ images: [], videos: [] });
                // Refresh the story data
                window.location.reload();
            } else {
                setMessage(data.message || 'Failed to add media');
            }
        } catch (err) {
            console.error('Error adding media:', err);
            setMessage('Failed to add media');
        }
    };

    if (!story) {
        return (
            <div className="text-gray-500 p-4">
                ⚠️ No story selected.
                <button onClick={onBack} className="ml-2 text-blue-500 underline text-sm">
                    Go back
                </button>
            </div>
        );
    }

    return (
        <div>
            <button
                onClick={onBack}
                className="text-gray-600 mb-4 hover:text-gray-800"
            >
                ← Back to Stories
            </button>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="relative">
                    {story.media && story.media.length > 0 && (
                        <div className="relative h-64 w-full">
                            <img
                                src={story.media[0].url}
                                alt={story.title}
                                className="w-full h-full object-cover rounded-t-lg"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/placeholder-fund.jpg';
                                }}
                            />
                            <button
                                onClick={() => setShowAddMedia(true)}
                                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm"
                            >
                                <PlusIcon size={16} />
                                Add Event Media
                            </button>
                        </div>
                    )}
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h1 className="text-2xl font-semibold">{story.title}</h1>
                        <p className="text-gray-600 mt-1">by {story.student}</p>
                    </div>

                    <div className="prose max-w-none">
                        <h3 className="text-lg font-medium">Impact Story</h3>
                        <p className="text-gray-600">{story.impact}</p>
                    </div>

                    {/* Pre-event Media Section */}
                    {story.media && story.media.length > 0 && (
                        <div>
                            <h3 className="text-lg font-medium mb-3">Pre-event Media</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {story.media.slice(0, 2).map((media, i) => (
                                    <div key={i} className="relative aspect-video">
                                        <img
                                            src={media.url}
                                            alt={`Pre-event media ${i + 1}`}
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

                    {/* Event Success Media Section */}
                    {story.media && story.media.length > 2 && (
                        <div>
                            <h3 className="text-lg font-medium mb-3">Event Success Media</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {story.media.slice(2).map((media, i) => (
                                    <div key={i} className="relative aspect-video">
                                        <img
                                            src={media.url}
                                            alt={`Event success media ${i + 1}`}
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

                    {message && (
                        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-md text-sm">
                            {message}
                        </div>
                    )}

                    {/* Add Media Modal */}
                    {showAddMedia && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                                <h3 className="text-lg font-medium mb-4">Add Event Success Media</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Images (up to 5)
                                        </label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, 'images')}
                                            className="w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Videos (up to 2)
                                        </label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="video/*"
                                            onChange={(e) => handleFileChange(e, 'videos')}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowAddMedia(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddMedia}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                    >
                                        Add Media
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 