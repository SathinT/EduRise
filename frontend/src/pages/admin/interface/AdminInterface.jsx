import React, { useState } from 'react';
import { DashboardStats } from './components/DashboardStats';
import { VerificationsView } from './components/VerificationsView';
import { StudentsTable } from './components/StudentsTable';
import { DonorsTable } from './components/DonorsTable';
import { AnalyticsView } from './components/AnalyticsView';
import { UserManagementView } from './components/UserManagementView';
import { FundraisingView } from './components/FundraisingView';
import { Layout } from '../../../common/Layout';

export function AdminInterface() {
    const [activeView, setActiveView] = useState('dashboard');

    const handleNavigate = (view) => {
        setActiveView(view);
    };

    return (
        <Layout
            title="Admin Dashboard"
            onNavigate={handleNavigate}
            activeView={activeView}
            views={[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'students', label: 'Students' },
                { id: 'donors', label: 'Donors' },
                { id: 'donations', label: 'Donations' },
                { id: 'reports', label: 'Reports' },
                { id: 'verifications', label: 'Verifications' },
                { id: 'fundraising', label: 'Fundraising Approval' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'users', label: 'User Management' },
            ]}
            userType="admin"
        >
            {activeView === 'dashboard' && <DashboardStats />}
            {activeView === 'students' && <StudentsTable />}
            {activeView === 'donors' && <DonorsTable />}
            {activeView === 'donations' && <AnalyticsView />}
            {activeView === 'reports' && <AnalyticsView />}
            {activeView === 'verifications' && <VerificationsView />}
            {activeView === 'fundraising' && <FundraisingView />}
            {activeView === 'analytics' && <AnalyticsView />}
            {activeView === 'users' && <UserManagementView />}
        </Layout>
    );
}