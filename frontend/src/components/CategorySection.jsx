import React from 'react'
import {
    GraduationCapIcon,
    BuildingIcon,
    HeartIcon,
    BriefcaseIcon,
} from 'lucide-react'
const CategoryCard = ({ icon, title, color }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div
                className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mr-3`}
            >
                {icon}
            </div>
            <div>
                <p className="font-medium text-gray-800">{title}</p>
            </div>
        </div>
    )
}
const CategorySection = () => {
    return (
        <section className="py-16 px-4 bg-yellow-50">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">
                            Helping each other, Growing together
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
                    <div className="md:w-1/2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CategoryCard
                                icon={<GraduationCapIcon size={20} className="text-gray-800" />}
                                title="School Students"
                                color="bg-blue-100"
                            />
                            <CategoryCard
                                icon={<BuildingIcon size={20} className="text-gray-800" />}
                                title="University"
                                color="bg-purple-100"
                            />
                            <CategoryCard
                                icon={<HeartIcon size={20} className="text-gray-800" />}
                                title="Kind Donors"
                                color="bg-red-100"
                            />
                            <CategoryCard
                                icon={<BriefcaseIcon size={20} className="text-gray-800" />}
                                title="Business Owners"
                                color="bg-green-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CategorySection
