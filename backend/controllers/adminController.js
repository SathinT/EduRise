import User from '../models/User.js';
import FundingProfile from '../models/student/FundingProfile.js';
import StudentProfile from '../models/student/StudentProfile.js';
import DonorProfile from '../models/donor/DonorProfile.js';
import Student from '../models/student/Student.js';
import Donor from '../models/donor/Donor.js';
import Donation from '../models/Donation.js';

export const getAdminStats = async (req, res) => {
    try {
        // Get total students (users with role 'student')
        const totalStudents = await User.countDocuments({ role: 'student' });

        // Get total donors (users with role 'donor')
        const totalDonors = await User.countDocuments({ role: 'donor' });

        // Get pending verifications (student profiles pending verification)
        const pendingVerifications = await StudentProfile.countDocuments({ 
            verificationStatus: 'pending' 
        }) || 0;

        // Get pending funds
        const pendingFunds = await FundingProfile.countDocuments({ 
            status: 'Pending' 
        }) || 0;

        // Get pending impact reports (funds that are completed but no impact report)
        const pendingImpact = await FundingProfile.countDocuments({
            status: 'Completed',
            impact: { $exists: false }
        }) || 0;

        // Get total donations
        const totalDonations = await FundingProfile.aggregate([
            { $match: { status: 'Completed' } },
            { $group: { _id: null, total: { $sum: '$goalAmount' } } }
        ]).then(result => result[0]?.total || 0);

        // Get success rate (completed funds / total funds)
        const totalFunds = await FundingProfile.countDocuments();
        const completedFunds = await FundingProfile.countDocuments({ status: 'Completed' });
        const successRate = totalFunds > 0 ? (completedFunds / totalFunds * 100).toFixed(1) : 0;

        res.json({
            totalStudents,
            totalDonors,
            pendingVerifications,
            pendingFunds,
            pendingImpact,
            totalDonations,
            successRate
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ message: 'Error fetching admin statistics' });
    }
};

// Get admin dashboard statistics
export const getStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalDonors = await Donor.countDocuments();
        const totalDonations = await Donation.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const pendingFunds = await FundingProfile.countDocuments({ status: 'pending' });
        const completedFunds = await FundingProfile.countDocuments({ status: 'completed' });
        const successRate = totalStudents > 0 ? Math.round((completedFunds / totalStudents) * 100) : 0;

        res.json({
            totalStudents,
            totalDonors,
            totalDonations: totalDonations[0]?.total || 0,
            pendingFunds,
            successRate
        });
    } catch (error) {
        console.error('Error getting admin stats:', error);
        res.status(500).json({ message: 'Error getting admin statistics' });
    }
};

// Get recent donations
export const getRecentDonations = async (req, res) => {
    try {
        const donations = await Donation.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('donor', 'name')
            .populate('fund', 'title');

        const formattedDonations = donations.map(donation => ({
            id: donation._id,
            amount: donation.amount,
            donor: donation.donor.name,
            fund: donation.fund.title,
            date: donation.createdAt
        }));

        res.json(formattedDonations);
    } catch (error) {
        console.error('Error getting recent donations:', error);
        res.status(500).json({ message: 'Error getting recent donations' });
    }
};

// Get all students
export const getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .select('fullName email createdAt verificationStatus')
            .sort({ createdAt: -1 });

        const formattedStudents = students.map(student => ({
            _id: student._id,
            name: student.fullName,
            email: student.email,
            verificationStatus: student.verificationStatus || 'pending',
            dateJoined: student.createdAt
        }));

        res.json(formattedStudents);
    } catch (error) {
        console.error('Error getting students:', error);
        res.status(500).json({ message: 'Error getting students' });
    }
};

// Get single student
export const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Error getting student:', error);
        res.status(500).json({ message: 'Error getting student' });
    }
};

// Update student
export const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Error updating student' });
    }
};

// Delete student
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Error deleting student' });
    }
};

// Get all donors
export const getDonors = async (req, res) => {
    try {
        const donors = await User.find({ role: 'donor' })
            .select('fullName email createdAt')
            .sort({ createdAt: -1 });

        const formattedDonors = donors.map(donor => ({
            _id: donor._id,
            name: donor.fullName,
            email: donor.email,
            dateJoined: donor.createdAt
        }));

        res.json(formattedDonors);
    } catch (error) {
        console.error('Error getting donors:', error);
        res.status(500).json({ message: 'Error getting donors' });
    }
};

// Get single donor
export const getDonor = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.json(donor);
    } catch (error) {
        console.error('Error getting donor:', error);
        res.status(500).json({ message: 'Error getting donor' });
    }
};

// Update donor
export const updateDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.json(donor);
    } catch (error) {
        console.error('Error updating donor:', error);
        res.status(500).json({ message: 'Error updating donor' });
    }
};

// Delete donor
export const deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.json({ message: 'Donor deleted successfully' });
    } catch (error) {
        console.error('Error deleting donor:', error);
        res.status(500).json({ message: 'Error deleting donor' });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('name email role status createdAt')
            .sort({ createdAt: -1 });

        const formattedUsers = users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            joinedDate: user.createdAt
        }));

        res.json(formattedUsers);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Error getting users' });
    }
};

// Get single user
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Error getting user' });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}; 