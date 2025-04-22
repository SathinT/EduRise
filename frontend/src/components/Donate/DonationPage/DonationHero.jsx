import React from 'react'
import donationBg from '../../../assets/Home/donationBg.png'
const DonationHero = () => {
    return (
        <section className="relative bg-gray-900 text-white">
            <section
                className="bg-cover bg-top"
                style={{ backgroundImage: `url(${donationBg})` }}>
                <div className="container mx-auto px-4 py-24 relative z-10">
                    <div className="max-w-lg mt-14">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            Your Thought,
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-bold mb-3">
                            Matters To Them
                        </h2>
                        <p className="text-yellow-400 mb-8">
                            Better Future For the Next Gen Of Scholars.
                        </p>
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
export default DonationHero
