import React from 'react'
const NewsletterSection = () => {
    return (
        <section className="py-12 px-6 md:px-12 bg-yellow-100 bg-opacity-70">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-yellow-100 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-bold mb-4">
                        Don't Miss our weekly updates about donations
                    </h3>
                    <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default NewsletterSection
