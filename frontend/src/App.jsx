import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import InfoSection from './components/InfoSection'
import CategorySection from './components/CategorySection'
import StatsSection from './components/StatsSection'
import NewsletterSection from './components/NewsletterSection'
import Footer from './components/Footer'
import MailUsSection from './components/MailUsSection.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
    return (
        <>
            <div className="w-full min-h-screen flex flex-col bg-white">
                <Header />
                <Hero />
                <InfoSection />
                <CategorySection />
                <StatsSection />
                <NewsletterSection />
                <MailUsSection />
                <Footer />
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default App
