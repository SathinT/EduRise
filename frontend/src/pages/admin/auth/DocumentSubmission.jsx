import React, { useState } from 'react';
import logo from '../../../assets/Home/Logo.png';
import loginMask from "../../../assets/Auth/loginMask.png";
import docsubbg from "../../../assets/Auth/docsubbg.png";

export function DocumentSubmissionPage({ onNavigate }) {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <div className="w-full h-screen flex">
            {/* Left Section */}
            <div className="w-3/5 h-full bg-[#1E1E1E] p-8 pl-36 pr-36 flex flex-col relative overflow-hidden">
                {/* Globe Icon */}
                <div className="absolute top-0 right-0 opacity-70">
                    <img
                        src={loginMask}
                        alt="Globe design"
                        className="w-64 h-64"
                    />
                </div>

                {/* Logo */}
                <div
                    className="h-12 w-50 bg-contain bg-no-repeat"
                    style={{ backgroundImage: `url(${logo})` }}
                    aria-label="Edurise Logo"
                ></div>

                {/* Main Content */}
                <div className="mt-20">
                    <h1 className="text-yellow-500 text-4xl font-bold border-b-4 border-yellow-500 pb-1 inline-block">
                        DOCUMENT SUBMISSION
                    </h1>

                    <div className="mt-16">
                        <div className="bg-white rounded p-6">
                            <h2 className="text-gray-800 font-semibold">
                                Enter Verification Certifications
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Upload your verification certificates to build trust, validate
                                your authenticity, and showcase your credibility
                            </p>

                            <div className="mt-4 text-gray-500 text-xs">
                                <p>e.g.</p>
                                <p>- Letter on your university letterhead</p>
                                <p>- Recorded video clip of school teacher or principal</p>
                            </div>

                            {/* Upload Box */}
                            <div className="mt-6 flex justify-center border-2 border-dashed border-gray-300 rounded p-6 bg-gray-50">
                                <label htmlFor="file-upload" className="cursor-pointer text-center">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mx-auto"
                                        aria-hidden="true"
                                    >
                                        <circle cx="20" cy="20" r="19.5" stroke="#CCCCCC" />
                                        <path
                                            d="M20 12V28M20 12L14 18M20 12L26 18"
                                            stroke="#CCCCCC"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Click to upload / Drag and drop
                                    </p>
                                    {fileName && (
                                        <p className="text-sm text-green-600 mt-2">
                                            Selected: {fileName}
                                        </p>
                                    )}
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Upload Button */}
                        <div className="mt-6 text-center">
                            <button
                                className={`${
                                    fileName ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-gray-400 cursor-not-allowed'
                                } text-black font-semibold py-3 px-10 rounded transition duration-200`}
                                onClick={() => {
                                    if (fileName) {
                                        onNavigate('register');
                                    } else {
                                        alert("Please upload a verification document first.");
                                    }
                                }}
                                disabled={!fileName}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section with Background Image */}
            <div
                className="w-2/5 h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${docsubbg})` }}
                aria-label="Children in classroom"
            ></div>
        </div>
    );
}
