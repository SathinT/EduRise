import React from 'react'
import donateBg from '../../assets/Home/donateBg.png'
const DonateHero = () => {
    return (
        <section className="relative bg-gray-900 text-white">
            <section
                className="bg-cover bg-top"
                style={{ backgroundImage: `url(${donateBg})` }}>
                <div className="container mx-auto px-4 py-24 relative z-10">
                    <div className="max-w-lg mt-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            Amazing People,
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-bold mb-3">
                            Brighter Hearts
                        </h2>
                        <p className="text-yellow-400 mb-8">
                            Makes Big Changes In The World.
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
export default DonateHero
