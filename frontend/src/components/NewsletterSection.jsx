import React from 'react'
const InfoSection = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-200 rounded-md"></div>
                        <img
                            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                            alt="Students raising hands"
                            className="rounded-md relative z-10 w-full h-auto object-cover"
                        />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-200 rounded-md"></div>
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
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-6 rounded-md font-medium">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    )
}
export default InfoSection
