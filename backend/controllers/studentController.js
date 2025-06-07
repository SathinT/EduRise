import StudentProfile from '../models/student/StudentProfile.js';
import User from '../models/User.js';

// @desc    Get student profile
// @route   GET /api/student/profile
// @access  Private
export const getStudentProfile = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({ user: req.user.id })
            .populate('user', 'email fullName isVerified verificationStatus');
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.error('Error in getStudentProfile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update student profile
// @route   PUT /api/student/profile
// @access  Private
export const updateStudentProfile = async (req, res) => {
    try {
        const {
            fullName,
            dateOfBirth,
            gender,
            address,
            contactNumber,
            education
        } = req.body;

        let profile = await StudentProfile.findOne({ user: req.user.id });

        if (!profile) {
            // Create new profile if it doesn't exist
            profile = new StudentProfile({
                user: req.user.id,
                fullName,
                dateOfBirth,
                gender,
                address,
                contactNumber,
                education,
                verificationStatus: 'pending'
            });
        } else {
            // Update existing profile
            profile.fullName = fullName || profile.fullName;
            profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
            profile.gender = gender || profile.gender;
            // Handle address as string or object
            let formattedAddress = address;
            if (typeof address === 'string') {
                formattedAddress = { street: address };
            }
            profile.address = formattedAddress || profile.address;
            profile.contactNumber = contactNumber || profile.contactNumber;
            profile.education = education || profile.education;
            
            // Reset verification status if profile is updated
            profile.verificationStatus = 'pending';
        }

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error('Error in updateStudentProfile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Upload student documents
// @route   POST /api/student/profile/documents
// @access  Private
export const uploadStudentDocuments = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const profile = await StudentProfile.findOne({ user: req.user.id });
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Add new document filenames to the documents array
        const newDocuments = req.files.map(file => file.filename);
        profile.documents = [...profile.documents, ...newDocuments];
        
        // Reset verification status when new documents are uploaded
        profile.verificationStatus = 'pending';
        
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error('Error in uploadStudentDocuments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get pending student verifications
// @route   GET /api/student/verifications
// @access  Private/Admin
export const getPendingVerifications = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const pendingProfiles = await StudentProfile.find({ verificationStatus: 'pending' })
            .populate('user', 'email fullName')
            .sort({ createdAt: -1 });

        res.json(pendingProfiles);
    } catch (error) {
        console.error('Error in getPendingVerifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Verify student profile
// @route   PUT /api/student/verifications/:id
// @access  Private/Admin
export const verifyStudentProfile = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { status, notes } = req.body;
        const profile = await StudentProfile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Update verification status in both profile and user
        profile.verificationStatus = status;
        profile.verificationNotes = notes;

        // Update user's verification status
        const user = await User.findById(profile.user);
        if (user) {
            user.isVerified = status === 'verified';
            user.verificationStatus = status;
            await user.save();
        }

        await profile.save();
        
        // Return both profile and user data
        const updatedProfile = await StudentProfile.findById(req.params.id)
            .populate('user', 'email fullName isVerified verificationStatus');
            
        res.json(updatedProfile);
    } catch (error) {
        console.error('Error in verifyStudentProfile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}; 