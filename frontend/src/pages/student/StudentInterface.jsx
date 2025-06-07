import React, { useState, useEffect } from 'react';
import { Layout } from '../../common/Layout';
import { StudentProfile } from './components/StudentProfile';
import { FundsView } from './components/FundsView';
import { DonationsView } from './components/DonationsView';
import { ImpactView } from './components/ImpactView';
import { SuccessView } from './components/SuccessView';
import { ThankNotesView } from './components/ThankNotesView';

export function StudentInterface() {
    const [activeView, setActiveView] = useState('profile');
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkVerificationStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/student/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                console.log('Profile data:', data); // Debug log
                
                // Check both profile and user verification status
                const isProfileVerified = data.verificationStatus === 'verified';
                const isUserVerified = data.user?.isVerified === true;
                const isVerified = isProfileVerified && isUserVerified;
                
                console.log('Verification status:', { isProfileVerified, isUserVerified, isVerified }); // Debug log
                
                setIsVerified(isVerified);
                
                // If verified, enable the views
                if (isVerified && activeView === 'profile') {
                    setActiveView('funds');
                }
            }
        } catch (error) {
            console.error('Error checking verification status:', error);
        } finally {
            setLoading(false);
        }
    };

    // Check verification status on mount
    useEffect(() => {
        checkVerificationStatus();
    }, []);

    const handleNavigate = (view) => {
        if (!isVerified && view !== 'profile') {
            return;
        }
        setActiveView(view);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <Layout
            title="Student Dashboard"
            onNavigate={handleNavigate}
            activeView={activeView}
            views={[
                { id: 'profile', label: 'Profile' },
                { id: 'funds', label: 'My Funds', disabled: !isVerified },
                { id: 'donations', label: 'Donations', disabled: !isVerified },
                { id: 'impact', label: 'Impact', disabled: !isVerified },
                { id: 'success', label: 'Success Stories', disabled: !isVerified },
                { id: 'thanknotes', label: 'Thank Notes', disabled: !isVerified },
            ]}
            userType="student"
        >
            {activeView === 'profile' && <StudentProfile onVerificationStatusChange={setIsVerified} />}
            {activeView === 'funds' && isVerified && <FundsView />}
            {activeView === 'donations' && isVerified && <DonationsView />}
            {activeView === 'impact' && isVerified && <ImpactView />}
            {activeView === 'success' && isVerified && <SuccessView />}
            {activeView === 'thanknotes' && isVerified && <ThankNotesView />}
        </Layout>
    );
}
