import express from 'express';
import { auth } from '../middleware/auth.js';
import {
    createFundingProfile,
    getMyFundingProfiles,
    getApprovedFundingProfiles,
    getPendingFunds,
    approveFund,
    rejectFund,
    addThankNote,
    markFundAsComplete,
    addMediaAndImpact,
    getThankNotes
} from '../controllers/FundingController.js';

const router = express.Router();

// Create a new funding profile
router.post('/', auth, createFundingProfile);

// Get my funding profiles (for students)
router.get('/my-profiles', auth, getMyFundingProfiles);

// Get approved funding profiles (for donors)
router.get('/approved', auth, getApprovedFundingProfiles);

// Get pending funds (for admin)
router.get('/pending', auth, getPendingFunds);

// Approve a fund (for admin)
router.put('/:id/approve', auth, approveFund);

// Reject a fund (for admin)
router.put('/:id/reject', auth, rejectFund);

// Add thank you note to a fund
router.post('/:id/thank-note', auth, addThankNote);

// Mark fund as complete
router.put('/:id/complete', auth, markFundAsComplete);

// Add media and impact to completed fund
router.post('/:id/impact', auth, addMediaAndImpact);

// Get thank you notes for a donor
router.get('/thank-notes', auth, getThankNotes);

export default router; 