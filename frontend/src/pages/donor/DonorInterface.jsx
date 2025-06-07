import React, { useState } from 'react'
import { Layout } from '../../common/Layout.jsx'
import { DonorDashboard } from './components/DonorDashboard.jsx'

export function DonorInterface({ onLogout }) {
    const [activeView, setActiveView] = useState('browse')

    return (
        <Layout
            activeView={activeView}
            onNavigate={setActiveView}
            userType="donor"
            onLogout={onLogout}
        >
            <DonorDashboard activeView={activeView} />
        </Layout>
    )
}
