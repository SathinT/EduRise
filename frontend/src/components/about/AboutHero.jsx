import React from 'react'
import img1 from "../../assets/Home/aboutImg2.png";
import img2 from "../../assets/Home/aboutImg1.png";

const HeroSection = () => {
    return (
        <section className="relative w-full h-[500px] bg-gray-900 overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 flex">
                <div
                    className="w-1/2 h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img1})` }}
                ></div>
                <div
                    className="w-1/2 h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img2})` }}
                ></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 container mx-auto h-full flex items-center">
                <div className="w-full md:w-1/2"></div>
                <div className="w-full md:w-1/2 text-white p-8 backdrop-blur-sm bg-black/40 rounded">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Dream Bigger,
                        <br/>
                        Worry Lesser
                    </h1>
                    <p className="text-yellow-500 text-lg mb-6">
                        Who we are and What We Do
                    </p>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded transition duration-300">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;