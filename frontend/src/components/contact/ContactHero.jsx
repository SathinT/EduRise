import React from 'react';
import contactbg from "../../assets/Home/contactmainBg.png";

function ContactHero() {
    return (
        <section className="relative bg-gray-900 text-white">
            <section
                className="bg-cover bg-top"
                style={{ backgroundImage: `url(${contactbg})` }}>
                <div className="container mx-auto px-4 py-24 relative z-10">
                    <div className="max-w-lg">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            Any Doubts,
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-bold mb-3">
                            Worry Less
                        </h2>
                        <p className="text-yellow-400 mb-8">
                            Better Future For the Next Gen Of Scholars.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-white text-gray-900 hover:bg-gray-100 py-2 px-6 rounded-md font-medium">
                                Register
                            </button>
                            <button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 py-2 px-6 rounded-md font-medium">
                                Donate Now
                            </button>
                        </div>
                        <div className="mt-12 flex items-center">
                            <div className="h-1 w-1 bg-yellow-400 rounded-full mr-2"></div>
                            <p className="text-sm text-gray-300">Scroll For More</p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}
export default ContactHero