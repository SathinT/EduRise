import React from 'react'
import logo from '../assets/Home/logo.png'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <header className="bg-gray-900 text-white py-3 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="h-12 w-50 bg-contain bg-no-repeat"
                         style={{ backgroundImage: `url(${logo})` }}>
                    </div>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="/" className="hover:text-yellow-400 text-sm">
                        Home
                    </a>
                    <a href="about" className="hover:text-yellow-400 text-sm">
                        About
                    </a>
                    <a href="contact" className="hover:text-yellow-400 text-sm">
                        Contact
                    </a>
                    <Link to="/donate" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-1 px-4 rounded-md text-sm">
                        Donate Now
                    </Link>
                </nav>
            </div>
        </header>
    )
}
export default Header
