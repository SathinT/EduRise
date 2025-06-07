import express from 'express';
import {
    createFundingProfile,
    getMyFundingProfiles,
    getApprovedFundingProfiles,
    getPendingFunds,
    approveFund,
    rejectFund,
    getSuccessStories,
    addThankNote,
    markFundAsComplete,
    addMediaAndImpact,
    getThankNotes
} from '../controllers/fundingController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import FundingProfile from "../models/student/FundingProfile.js";
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Student routes
router.post('/', protect, upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 },
    { name: 'documents', maxCount: 5 }
]), createFundingProfile);

router.get('/student', protect, getMyFundingProfiles);

// Public routes
router.get('/approved', getApprovedFundingProfiles);
router.get('/success-stories', getSuccessStories);

// Admin routes
router.get('/pending', protect, adminOnly, getPendingFunds);
router.put('/:id/approve', protect, approveFund);
router.put('/:id/reject', protect, rejectFund);

router.put('/:id/complete', protect, markFundAsComplete);

router.put('/:id/media', protect, upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 }
]), addMediaAndImpact);

// Thank note routes
router.post('/:id/thank-note', protect, upload.single('media'), addThankNote);
router.get('/thank-notes', protect, getThankNotes);

// Debug middleware for thank notes
router.use('/thank-notes', (req, res, next) => {
    console.log('Thank notes route accessed:', {
        method: req.method,
        url: req.url,
        user: req.user?._id,
        headers: req.headers
    });
    next();
});

export default router;
