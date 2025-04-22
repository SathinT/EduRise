import React from 'react'
import Header from "../../components/Header.jsx";
import DonationHero from "../../components/Donate/DonationPage/DonationHero.jsx";
import DonationForm from "../../components/Donate/DonationPage/DonationForm.jsx";
import Footer from "../../components/Footer.jsx";

export function DonationPage() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <Header />
            <DonationHero />
            <DonationForm />
            <Footer />
        </div>
    )
}

export default DonationPage