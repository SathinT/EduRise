import React from 'react'
import Header from "../../components/Header.jsx";
import ContactForm from "../../components/contact/ContactForm.jsx";
import ContactHero from "../../components/contact/ContactHero.jsx";
import StatsSection from "../../components/StatsSection.jsx";
import Footer from "../../components/Footer.jsx";
import MailUsSection from "../../components/MailUsSection.jsx";

export function ContactPage() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <Header />
            <ContactHero />
            <ContactForm />
            <StatsSection />
            <MailUsSection />
            <Footer />
        </div>
    )}

export default ContactPage