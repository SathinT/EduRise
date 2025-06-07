import React from 'react';
import DonationCard from './DonationCard';

export default function DonationGrid() {
    const graduationCards = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1170&q=80',
            title: 'Graduation Day',
            heldBy: '72,73,74,75 Batches',
            campusName: 'ABC CAMPUS'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=1170&q=80',
            title: 'Hackathon 2024',
            heldBy: 'CS Batch 21/22',
            campusName: 'XYZ INSTITUTE'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1627556704290-2b1f5c2a272d?auto=format&fit=crop&w=1170&q=80',
            title: 'Innovator’s Expo',
            heldBy: 'Electrical Dept',
            campusName: 'LMN TECH'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?auto=format&fit=crop&w=1074&q=80',
            title: 'Science Fair',
            heldBy: 'Science Club',
            campusName: 'JKL SCHOOL'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1170&q=80',
            title: 'Charity Concert',
            heldBy: 'All Campus Bands',
            campusName: 'ABC CAMPUS'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1627556704243-5f0771d90783?auto=format&fit=crop&w=1170&q=80',
            title: 'Tech Meetup',
            heldBy: 'Dev Society',
            campusName: 'XYZ INSTITUTE'
        },
    ];


    return (
        <section className="py-10 px-6 md:px-12 bg-gradient-to-b from-gray-500 to-gray-950">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-1">
                START DONATING
            </h2>
            <p className="text-center text-yellow-400 mb-8">
                Ongoing Funding projects
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 mx-auto">
                {graduationCards.map((card, index) => (
                    <DonationCard
                        key={index}
                        imageUrl={card.imageUrl}
                        title={card.title}
                        heldBy={card.heldBy}
                        campusName={card.campusName}
                    />
                ))}
            </div>
            <div className="text-center mt-8">
                <button className="bg-gray-700 text-white py-2 px-6 rounded hover:bg-gray-600">
                    View More
                </button>
            </div>
        </section>
    );
}
