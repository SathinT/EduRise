import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getDonorStats, getDonorDonations } from '../controllers/donorController.js';

const router = express.Router();

// Get donor statistics
router.get('/stats', protect, getDonorStats);

// Get donor's donations
router.get('/donations', protect, getDonorDonations);

export default router; 