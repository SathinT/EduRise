import React, { useState, useEffect } from 'react'
import { MediaGallery } from './MediaGallery'

export function SuccessStoriesView() {
    const [selectedStory, setSelectedStory] = useState(null)
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                setLoading(true);
                console.log('Fetching success stories...'); // Debug log
                const res = await fetch('http://localhost:5000/api/funding/success-stories');
                if (!res.ok) {
                    const errorData = await res.json();
                    console.error('Server error response:', errorData); // Debug log
                    throw new Error(errorData.message || 'Failed to fetch success stories');
                }
                const data = await res.json();
                console.log('Success stories data received:', data); // Debug log
                setStories(data);
            } catch (err) {
                console.error('Error fetching success stories:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading success stories...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                <p className="font-medium">Error loading success stories</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        );
    }

    if (stories.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No success stories available yet.</p>
                <p className="text-sm text-gray-400 mt-2">
                    Success stories will appear here once students complete their funds and add impact statements.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold">Success Stories</h2>
                <p className="text-gray-600 mt-1">
                    See how your support has made a difference
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story) => (
                    <div
                        key={story.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedStory(story)}
                    >
                        <div className="aspect-video bg-gray-100">
                            {story.media && story.media.length > 0 ? (
                                story.media[0].type === 'video' ? (
                                    <video
                                        src={story.media[0].url}
                                        className="w-full h-full object-cover"
                                        controls
                                    />
                                ) : (
                                    <img
                                        src={story.media[0].url}
                                        alt={story.title}
                                        className="w-full h-full object-cover"
                                    />
                                )
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No media available
                                </div>
                            )}
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="font-medium text-lg">{story.title}</h3>
                                <p className="text-sm text-gray-500">
                                    by {story.student} • Completed on {new Date(story.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Fund Amount:</span>
                                <span className="font-medium">
                                    {new Intl.NumberFormat('en-LK', {
                                        style: 'currency',
                                        currency: 'LKR',
                                        maximumFractionDigits: 0
                                    }).format(story.amount)}
                                </span>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    Impact
                                </h4>
                                <p className="text-gray-600 text-sm">{story.impact}</p>
                            </div>
                            {story.media && story.media.length > 0 && (
                                <div className="pt-4 border-t">
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                        {story.media.length} {story.media.length === 1 ? 'item' : 'items'} in gallery
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {selectedStory && (
                <MediaGallery
                    items={selectedStory.media}
                    onClose={() => setSelectedStory(null)}
                />
            )}
        </div>
    )
}
