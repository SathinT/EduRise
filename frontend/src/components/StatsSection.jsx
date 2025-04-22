import React from 'react';
import img2 from "../assets/Home/img2.png";

const StatItem = ({ number, label, description }) => {
    return (
        <div className="flex flex-col items-start">
            <div className="text-3xl font-bold">
                <span className={number.includes('+') ? 'text-yellow-500' : ''}>{number}</span>
            </div>
            <div className="text-lg font-semibold mb-1">{label}</div>
            <p className="text-sm text-gray-600 leading-snug">{description}</p>
        </div>
    );
};

const StatsSection = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Left image section */}
                <div className="relative md:w-[40%] w-full flex justify-center">
                    {/* Yellow circle */}
                    <div className="absolute w-[280px] h-[280px] bg-yellow-200 rounded-full -z-10 top-0 md:left-10 left-0"></div>
                    <img
                        src={img2}
                        alt="Student"
                        className="w-[320px] h-auto relative z-10"
                    />
                </div>

                {/* Right stats section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:w-[60%] w-full">
                    <StatItem
                        number="10"
                        label="Regular Donations"
                        description="Daily we get over 10+ donations within our website so funds can be completed within short time period."
                    />
                    <StatItem
                        number="30+"
                        label="Donors Registered"
                        description="Daily we get over 10+ donations within our website so funds can be completed within short time period."
                    />
                    <StatItem
                        number="60+"
                        label="Students Registered"
                        description="Daily we get over 10+ donations within our website so funds can be completed within short time period."
                    />
                    <StatItem
                        number="20+"
                        label="Businesses Registered"
                        description="Daily we get over 10+ donations within our website so funds can be completed within short time period."
                    />
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
