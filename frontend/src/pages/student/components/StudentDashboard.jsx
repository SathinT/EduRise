import React from 'react';
import { FundsView } from './FundsView.jsx';
import { ProfileView } from './ProfileView.jsx';
import { SuccessView } from './SuccessView.jsx';

export function StudentDashboard({ activeView }) {
    return (
        <div className="space-y-8">
            {activeView === 'funds' && <FundsView />}
            {activeView === 'profile' && <ProfileView />}
            {activeView === 'success' && <SuccessView />}
        </div>
    )
}