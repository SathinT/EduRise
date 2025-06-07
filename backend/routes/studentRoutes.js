import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
    getStudentProfile,
    updateStudentProfile,
    uploadStudentDocuments,
    getPendingVerifications,
    verifyStudentProfile
} from '../controllers/studentController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Student routes
router.get('/profile', protect, getStudentProfile);
router.put('/profile', protect, updateStudentProfile);
router.post('/profile/documents', protect, upload.array('documents', 5), uploadStudentDocuments);

// Admin routes for verification
router.get('/verifications', protect, getPendingVerifications);
router.put('/verifications/:id', protect, verifyStudentProfile);

export default router; 