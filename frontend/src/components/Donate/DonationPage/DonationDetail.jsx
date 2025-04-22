import React, { useState } from 'react'
import Header from "../../Header.jsx";
import DonationForm from "./DonationForm.jsx";
import Footer from "../../Footer.jsx";
import image from '../../../assets/Home/whattheygetbg.png'

const DonationDetail = () => {
    const [donationAmount, setDonationAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [thankingOptions, setThankingOptions] = useState('')

    const project = {
        title: "Graduation Day 2025",
        subtitle: "Celebrating Success",
        image: image,
        batches: 4,
        daysLeft: 10,
        raised: 4500,
        goal: 10000,
        donors: 120,
        description:
            "This event honors the hard work and dedication of students graduating in 2025. Help us make this celebration memorable!",
    }

    const percentRaised = (project.raised / project.goal) * 100

    const handleDonate = (e) => {
        e.preventDefault()
        alert(`🎉 Thank you for donating $${donationAmount}!`)
    }

    return (
        <div className="bg-gray-900">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-10 text-white bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold mb-2 text-yellow-400">{project.title}</h1>
            <h2 className="text-2xl text-yellow-500 mb-4">{project.subtitle}</h2>

            <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />

            <div className="bg-gray-800 p-6 rounded-lg mb-8">
                <p className="mb-2"><strong>Batches:</strong> {project.batches}</p>
                <p className="mb-2"><strong>Days Left:</strong> {project.daysLeft}</p>
                <p className="mb-2">
                    <strong>Raised:</strong> ${project.raised.toLocaleString()} of ${project.goal.toLocaleString()} ({percentRaised.toFixed(0)}%)
                </p>
                <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden my-2">
                    <div
                        className="bg-yellow-400 h-3"
                        style={{ width: `${percentRaised}%` }}
                    ></div>
                </div>
                <p><strong>Donors:</strong> {project.donors}</p>
            </div>

            <div className="mb-10">
                <h3 className="text-xl font-semibold mb-2 text-yellow-400">About the Project</h3>
                <p className="text-gray-300">{project.description}</p>
            </div>

            <div className="outline-amber-400 outline-2">
                <DonationForm />
            </div>
            <Footer />
        </div>
        </div>
    )
}

export default DonationDetail
