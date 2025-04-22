import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import InfoSection from './components/InfoSection'
import CategorySection from './components/CategorySection'
import StatsSection from './components/StatsSection'
import NewsletterSection from './components/NewsletterSection'
import Footer from './components/Footer'
import MailUsSection from "./components/MailUsSection.jsx";
export function App() {
    return (
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
    )
}

export default App