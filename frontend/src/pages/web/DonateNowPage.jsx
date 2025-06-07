import React from 'react'
import Header from "../../components/Header.jsx";
import DonateHero from "../../components/Donate/DonateHero.jsx";
import DonationGrid from "../../components/Donate/DonationGrid.jsx";
import StatsSection from "../../components/StatsSection.jsx";
import MailUsSection from "../../components/MailUsSection.jsx";
import Footer from "../../components/Footer.jsx";

export function DonateNowPage() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <Header />
            <DonateHero />
            <DonationGrid />
            <StatsSection />
            <MailUsSection />
            <Footer />

        </div>
    )
}

export default DonateNowPage