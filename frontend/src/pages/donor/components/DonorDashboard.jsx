import React from 'react';
import PropTypes from 'prop-types';
import { DonationsView } from './DonationsView.jsx';
import { ThankNotesView } from './ThankNotesView.jsx';
import { BrowseFundsView } from './BrowseFundsView.jsx';
import { SuccessStoriesView } from './SuccessStoriesView.jsx';

export function DonorDashboard({ activeView }) {
    return (
        <div className="space-y-8">
            {activeView === 'browse' && <BrowseFundsView />}
            {activeView === 'donations' && <DonationsView />}
            {activeView === 'thanknotes' && <ThankNotesView />}
            {activeView === 'success' && <SuccessStoriesView />}
        </div>
    )
}