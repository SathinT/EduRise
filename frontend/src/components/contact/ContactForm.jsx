import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function ContactForm() {
    return (
        <div className="bg-gray-900 text-white p-6 md:p-10 rounded-lg w-full max-w-4/5 mx-auto flex flex-col md:flex-row gap-10 mt-10">
            {/* Left Side */}
            <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    Contact Us For Any<br />Quick Questions?
                </h2>
                <p className="text-yellow-400 mb-6">
                    If you got any doubts please be kind to ask from us<br />
                    we are here for any assistance you need
                </p>

                <div className="flex items-center gap-4 bg-yellow-500 bg-opacity-10 hover:bg-opacity-20 w-1/4 p-3 rounded-full">
                    <button className="text-gray-900 p-3 rounded-full">
                        <FaFacebook />
                    </button>
                    <button className="text-gray-900  p-3 rounded-full">
                        <FaInstagram />
                    </button>
                    <button className="text-gray-900 p-3 rounded-full">
                        <FaWhatsapp />
                    </button>
                </div>
            </div>

            <form className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="p-3 rounded-md bg-white text-black border-2 border-yellow-400 placeholder-black"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="p-3 rounded-md bg-white text-black border-2 border-yellow-400 placeholder-black"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Contact"
                        className="p-3 rounded-md bg-white text-black border-2 border-yellow-400 placeholder-black"
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        className="p-3 rounded-md bg-white text-black border-2 border-yellow-400 placeholder-black"
                    />
                </div>
                <textarea
                    rows="5"
                    placeholder="Message"
                    className="p-3 rounded-md bg-white text-black border-2 border-yellow-400 placeholder-black resize-none"
                ></textarea>
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-md w-fit"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
