import React from 'react'
import img1 from "../assets/Home/img1.png";
const InfoSection = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-2">
                <div className="md:w-1/2">
                    <div className="relative">
                        <div className="relative">
                            <img src={img1} alt="Info" className="w-full h-auto max-h-[400px] max-w-96 rounded-md ml-36" />
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">
                        Empowering The <span className="text-yellow-500">Future Minds</span>
                    </h2>
                    <p className="text-gray-600 mb-6">
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                        eos qui ratione voluptatem sequi nesciunt."
                    </p>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-6 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-yellow-300
">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    )
}
export default InfoSection
