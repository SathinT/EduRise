import React, { useState } from 'react';
import { Layout } from '../admin/interface/components/Layout.jsx';
import { StudentDashboard } from '../student/components/StudentDashboard.jsx';

export function StudentInterface({ onLogout }) {
    const [activeView, setActiveView] = useState('funds');

    return (
        <Layout
            activeView={activeView}
            onNavigate={setActiveView}
            userType="student"
            onLogout={onLogout}
        >
            <StudentDashboard />
        </Layout>
    );
}
