import React, { useState, useEffect } from 'react';
import { SendIcon, ImageIcon, X } from 'lucide-react';

export function ThankNotesView() {
    const [thankNotes, setThankNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchThankNotes();
    }, []);

    const fetchThankNotes = async () => {
        try {
            console.log('🔍 Fetching thank you notes...');
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('❌ No token found');
                setError('Authentication required');
                return;
            }

            console.log('🔑 Using token:', token.substring(0, 20) + '...');
            const res = await fetch('http://localhost:5000/api/funding/thank-notes', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('📡 Response status:', res.status);
            const data = await res.json();
            console.log('📦 Response data:', data);

            if (res.ok) {
                if (Array.isArray(data)) {
                    setThankNotes(data);
                } else {
                    console.error('❌ Invalid response format:', data);
                    setError('Invalid response format from server');
                }
            } else {
                console.error('❌ Server error:', data);
                setError(data.message || 'Failed to fetch thank you notes');
            }
        } catch (err) {
            console.error('❌ Error fetching thank you notes:', err);
            setError('Failed to fetch thank you notes');
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:5000/uploads/${imagePath}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md">
                {error}
            </div>
        );
    }

    if (thankNotes.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No thank you notes received yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Thank You Notes</h2>
            <div className="grid gap-6">
                {thankNotes.map((note, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-medium text-lg">{note.fund.title}</h3>
                                <p className="text-sm text-gray-500">
                                    From: {note.student.fullName}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="prose max-w-none">
                            <p className="text-gray-600">{note.message}</p>
                        </div>
                        {note.media && (
                            <div className="mt-4">
                                {note.media.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                    <img
                                        src={getImageUrl(note.media)}
                                        alt="Thank you media"
                                        className="max-h-64 rounded-lg"
                                    />
                                ) : (
                                    <video
                                        src={getImageUrl(note.media)}
                                        controls
                                        className="max-h-64 rounded-lg"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
