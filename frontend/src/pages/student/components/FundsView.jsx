import React, { useEffect, useState } from 'react';
import { Plus, FileText, DollarSign, Users } from 'lucide-react';
import {FundDetails} from "./FundDetails.jsx";



export function FundsView() {
    const [view, setView] = useState('list'); // list, add, details
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFund, setSelectedFund] = useState(null);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newFund, setNewFund] = useState({
        title: '',
        description: '',
        goalAmount: '',
        university: '',
        eventDate: '',
        documents: []
    });

    const fetchFunds = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/funding/student', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                console.log('Fetched funds:', data); // Debug log
                setFunds(data);
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to fetch funds');
            }
        } catch (error) {
            setError('Failed to fetch funds');
            console.error('Error fetching funds:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchFunds();

        // Set up polling every 30 seconds
        const pollInterval = setInterval(fetchFunds, 30000);

        // Cleanup interval on component unmount
        return () => clearInterval(pollInterval);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFund(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('documents', file);
        });

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/funding/documents', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setNewFund(prev => ({
                    ...prev,
                    documents: [...prev.documents, ...data.documents]
                }));
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to upload documents');
            }
        } catch (error) {
            setError('Failed to upload documents');
            console.error('Error uploading documents:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You're not logged in.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', newFund.title);
            formData.append('goalAmount', Number(newFund.goalAmount));
            formData.append('description', newFund.description);
            formData.append('university', newFund.university);
            formData.append('eventDate', newFund.eventDate);
            
            // Append files
            newFund.documents.forEach(file => formData.append('documents', file));

            const res = await fetch("http://localhost:5000/api/funding", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Failed to create fund' }));
                throw new Error(errorData.message || 'Failed to create fund');
            }

            const data = await res.json();
            console.log("✅ Fund created successfully:", data);
            alert("✅ Fund created successfully! Awaiting admin approval");
            fetchFunds();
            setShowCreateForm(false);
            setNewFund({
                title: '',
                description: '',
                goalAmount: '',
                university: '',
                eventDate: '',
                documents: []
            });
        } catch (err) {
            console.error("❌ Error during fund creation:", err);
            setError(err.message || "Failed to create fund. Please try again.");
        }
    };

    return (
        <div className="space-y-8">
            {view === 'list' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-semibold">Active Funds</h2>
                            <p className="text-gray-600 mt-1">Manage your educational funds</p>
                        </div>
                        <button
                            onClick={() => setView('add')}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center"
                        >
                            <Plus className="w-5 h-5 inline-block mr-2" />
                            Add Fund
                        </button>
                    </div>

                    {loading ? (
                        <p className="text-gray-500">Loading your funds...</p>
                    ) : funds.length === 0 ? (
                        <p className="text-gray-500">No funds found. Click "Add Fund" to get started.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {funds
                                .filter(f => f.status !== 'Completed') // Only active funds
                                .map(fund => (
                                    <FundCard
                                        key={fund._id}
                                        title={fund.title}
                                        amount={`LKR ${fund.goalAmount}`}
                                        progress={Number(((fund.raisedAmount || 0) / (fund.goalAmount || 1)) * 100).toFixed(1)}
                                        status={
                                            fund.status
                                                ? fund.status.charAt(0).toUpperCase() + fund.status.slice(1)
                                                : fund.approved === false
                                                    ? 'Rejected'
                                                    : fund.approved === true
                                                        ? 'Approved'
                                                        : 'Pending'
                                        }
                                        images={fund.images}
                                        onClick={() => {
                                            setSelectedFund(fund);
                                            setView('details');
                                        }}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            )}

            {view === 'add' && <AddFundForm onBack={() => setView('list')} />}
            {view === 'details' && selectedFund && (
                <FundDetails
                    fund={selectedFund}
                    onBack={() => {
                        fetchFunds(); // Refresh after going back
                        setView('list');
                    }}
                />
            )}

            {showCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Create New Fund</h3>
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newFund.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={newFund.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows="4"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Goal Amount (LKR)
                                </label>
                                <input
                                    type="number"
                                    name="goalAmount"
                                    value={newFund.goalAmount}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    University
                                </label>
                                <input
                                    type="text"
                                    name="university"
                                    value={newFund.university}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Date
                                </label>
                                <input
                                    type="datetime-local"
                                    name="eventDate"
                                    value={newFund.eventDate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">The fund will be automatically marked as completed on this date</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Supporting Documents
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <FileText className="w-8 h-8 mb-2 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PDF, JPG, PNG
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            multiple
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileUpload}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Create Fund
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function FundCard({ title, status, amount, progress, onClick, images }) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
        >
            <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                {images && images.length > 0 ? (
                    <img 
                        src={`http://localhost:5000/uploads/${images[0]}`}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>
            <div className="space-y-3">
                <h3 className="font-medium">{title}</h3>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Target Amount:</span>
                    <span className="font-medium">{amount}</span>
                </div>
                <div className="space-y-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-yellow-500 rounded-full"
                            style={{
                                width: `${progress}%`,
                            }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{progress}% Funded</span>
                        <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                status === 'Approved'
                                    ? 'bg-green-100 text-green-700'
                                    : status === 'Rejected'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                            {status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddFundForm({ onBack }) {
    const [title, setTitle] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [description, setDescription] = useState('');
    const [university, setUniversity] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);

    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        switch (type) {
            case 'images':
                setImages((prev) => [...prev, ...files]);
                break;
            case 'videos':
                setVideos((prev) => [...prev, ...files]);
                break;
            case 'documents':
                setDocuments((prev) => [...prev, ...files]);
                break;
        }
    };

    const removeFile = (index, type) => {
        switch (type) {
            case 'images':
                setImages((prev) => prev.filter((_, i) => i !== index));
                break;
            case 'videos':
                setVideos((prev) => prev.filter((_, i) => i !== index));
                break;
            case 'documents':
                setDocuments((prev) => prev.filter((_, i) => i !== index));
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You're not logged in.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('goalAmount', Number(goalAmount));
            formData.append('description', description);
            formData.append('university', university);
            formData.append('eventDate', eventDate);
            
            // Append files
            images.forEach(file => formData.append('images', file));
            videos.forEach(file => formData.append('videos', file));
            documents.forEach(file => formData.append('documents', file));

            const res = await fetch("http://localhost:5000/api/funding", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ message: 'Failed to create fund' }));
                throw new Error(errorData.message || 'Failed to create fund');
            }

            const data = await res.json();
            console.log("✅ Fund created successfully:", data);
            alert("✅ Fund created successfully!");
            onBack();
        } catch (err) {
            console.error("❌ Error during fund creation:", err);
            setError(err.message || "Failed to create fund. Please try again.");
        }
    };

    return (
        <div>
            <button onClick={onBack} className="text-gray-600 mb-4 hover:text-gray-800">
                ← Back to Funds
            </button>

            <div className="max-w-2xl">
                <h2 className="text-xl font-semibold mb-6">Create New Fund</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fund Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
                        <input
                            type="number"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    {/* University */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                        <input
                            type="text"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    {/* Event Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                        <input
                            type="datetime-local"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">The fund will be automatically marked as completed on this date</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            rows={4}
                            required
                        />
                    </div>

                    {/* Images Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Images</label>
                        <p className="text-xs text-gray-500 mb-2">Maximum file size: 50MB. Supported formats: JPEG, PNG, GIF</p>
                        <input 
                            type="file" 
                            multiple 
                            accept="image/jpeg,image/png,image/jpg,image/gif" 
                            onChange={(e) => handleFileChange(e, 'images')}
                            className="w-full"
                        />
                        {images.length > 0 && (
                            <ul className="mt-2 text-sm text-gray-600">
                                {images.map((file, i) => (
                                    <li key={i} className="flex items-center justify-between">
                                        <span>{file.name}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => removeFile(i, 'images')} 
                                            className="text-red-500 ml-2"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Videos Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Videos</label>
                        <p className="text-xs text-gray-500 mb-2">Maximum file size: 50MB. Supported formats: MP4, MOV, AVI, WMV</p>
                        <input 
                            type="file" 
                            multiple 
                            accept="video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv" 
                            onChange={(e) => handleFileChange(e, 'videos')}
                            className="w-full"
                        />
                        {videos.length > 0 && (
                            <ul className="mt-2 text-sm text-gray-600">
                                {videos.map((file, i) => (
                                    <li key={i} className="flex items-center justify-between">
                                        <span>{file.name}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => removeFile(i, 'videos')} 
                                            className="text-red-500 ml-2"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Documents Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                        <p className="text-xs text-gray-500 mb-2">Maximum file size: 50MB. Supported formats: PDF, DOC, DOCX, XLS, XLSX</p>
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={(e) => handleFileChange(e, 'documents')}
                            className="w-full"
                        />
                        {documents.length > 0 && (
                            <ul className="mt-2 text-sm text-gray-600">
                                {documents.map((file, i) => (
                                    <li key={i} className="flex items-center justify-between">
                                        <span>{file.name}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => removeFile(i, 'documents')} 
                                            className="text-red-500 ml-2"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={onBack} 
                            className="px-4 py-2 border rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        >
                            Create Fund
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddFundForm;
