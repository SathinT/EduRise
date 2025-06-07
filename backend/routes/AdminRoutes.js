import express from 'express';
import {
    getAdminStats,
    getStats,
    getRecentDonations,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    getDonors,
    getDonor,
    updateDonor,
    deleteDonor,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { getPendingFunds, approveFund, rejectFund } from '../controllers/FundingController.js';

const router = express.Router();

// Debug middleware for admin routes
router.use((req, res, next) => {
    console.log('Admin route accessed:', req.method, req.url);
    next();
});

// Apply authentication and admin middleware to all routes
router.use(protect);
router.use(adminOnly);

// Analytics routes
router.get('/stats', getStats);
router.get('/recent-donations', getRecentDonations);

// Student management routes
router.get('/students', getStudents);
router.get('/students/:id', getStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

// Donor management routes
router.get('/donors', getDonors);
router.get('/donors/:id', getDonor);
router.put('/donors/:id', updateDonor);
router.delete('/donors/:id', deleteDonor);

// User management routes
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Funding management routes
router.get('/funding/pending', getPendingFunds);
router.put('/funding/:id/approve', approveFund);
router.put('/funding/:id/reject', rejectFund);

export default router; 