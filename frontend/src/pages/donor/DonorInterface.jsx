import React, { useState } from 'react';
import { Layout } from '../admin/interface/components/Layout.jsx';
import { DonorDashboard } from '../donor/components/DonorDashboard.jsx';

export function DonorInterface({ onLogout }) {
    const [activeView, setActiveView] = useState('donations');

    return (
        <Layout
            activeView={activeView}
            onNavigate={setActiveView}
            userType="donor"
            onLogout={onLogout}
        >
            <DonorDashboard />
        </Layout>
    );
}
