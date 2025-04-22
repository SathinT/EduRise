import React from 'react'
import logo from "../assets/Home/Logo.png";
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 px-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <img src={logo} alt="Info" className="w-64 h-auto max-h-[400px] max-w-72 rounded-md ml-36" />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-yellow-400">
                            <FacebookIcon size={18} />
                        </a>
                        <a href="#" className="hover:text-yellow-400">
                            <InstagramIcon size={18} />
                        </a>
                        <a href="#" className="hover:text-yellow-400">
                            <TwitterIcon size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
