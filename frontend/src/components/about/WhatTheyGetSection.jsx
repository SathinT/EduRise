import { FaUserGraduate, FaBook, FaHandsHelping, FaNetworkWired } from 'react-icons/fa';
import bgimg from "../../assets/Home/whattheygetbg.png";

const cardData = [
    {
        title: 'School Students',
        description:
            'School students can use this platform to easily raise money for their events and projects. They can create fundraising profiles, share proof of how donations are used through photos and videos, and connect with donors through messages. This helps them build trust, get the support they need, and even showcase their creativity while thanking donors.',
        icon: <FaBook className="text-yellow-400 w-12 h-12 z-10" />,
        backgroundIcon: <FaBook className="absolute text-gray-700 opacity-10 text-[160px] right-[-20px] bottom-[-20px]" />,
    },
    {
        title: 'University Students',
        description:
            'University students can use this platform to raise funds for their academic or innovative projects. They can submit funding requests, provide proof of fund usage through photos and videos, and connect with donors for support. This helps them secure financial backing, gain recognition for their ideas, and build valuable connections for future opportunities.',
        icon: <FaUserGraduate className="text-yellow-400 w-12 h-12 z-10" />,
        backgroundIcon: <FaUserGraduate className="absolute text-gray-700 opacity-10 text-[160px] right-[-20px] bottom-[-20px]" />,
    },
    {
        title: 'Kind Donators',
        description:
            'Kind donors get the opportunity to support students in their education and innovative projects. They can browse verified fundraising profiles, donate securely, and see proof of how their contributions are used through photos and videos. Donors can also interact with students and receive personalized thank-you messages, making their giving experience more meaningful and rewarding.',
        icon: <FaHandsHelping className="text-yellow-400 w-12 h-12 z-10" />,
        backgroundIcon: <FaHandsHelping className="absolute text-gray-700 opacity-10 text-[160px] right-[-20px] bottom-[-20px]" />,
    },
    {
        title: 'Business Owners',
        description:
            'Business owners can support student initiatives while gaining brand visibility. They can sponsor fundraisers, advertise their business on the platform, and connect with talented students for potential collaborations. This allows them to give back to the community while also reaching a wider audience through meaningful contributions.',
        icon: <FaNetworkWired className="text-yellow-400 w-12 h-12 z-10" />,
        backgroundIcon: <FaNetworkWired className="absolute text-gray-700 opacity-10 text-[160px] right-[-20px] bottom-[-20px]" />,
    },
];

export default function UserTypeCards() {
    return (
        <div className="bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${bgimg})` }}>
            <h2 className="text-3xl font-bold text-center mb-10 mt-10 text-yellow-500">
                What They Get?
            </h2>
        <div className="w-full flex justify-center">
            <div className="w-11/12 md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                {cardData.map((card, idx) => (
                    <div
                        key={idx}
                        className="relative bg-gray-900 text-white rounded-lg border border-gray-700 p-6 overflow-hidden shadow-md"
                    >
                        {card.backgroundIcon}
                        <div className="mb-4 relative z-10">{card.icon}</div>
                        <h2 className="text-xl font-bold uppercase mb-2 relative z-10">{card.title}</h2>
                        <p className="text-sm text-gray-300 leading-relaxed relative z-10">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}
