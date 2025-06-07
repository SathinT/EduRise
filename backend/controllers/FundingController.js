// controllers/FundingController.js
import FundingProfile from '../models/student/FundingProfile.js';

export const createFundingProfile = async (req, res) => {
    console.log('🚨 createFundingProfile triggered');
    try {
        console.log('📦 Incoming fund:', req.body);
        console.log('📁 Files:', req.files);
        
        const { title, description, goalAmount, university } = req.body;

        const newFund = new FundingProfile({
            student: req.user._id,
            title,
            description,
            goalAmount,
            university,
            images: req.files['images']?.map(f => f.filename) || [],
            videos: req.files['videos']?.map(f => f.filename) || [],
            documents: req.files['documents']?.map(f => f.filename) || [],
            status: 'Pending',
        });

        await newFund.save();
        res.status(201).json(newFund);
    } catch (err) {
        console.error('❌ Fund creation error:', err);
        res.status(500).json({ message: 'Failed to create fund', error: err.message });
    }
};

// Get all success stories
export const getSuccessStories = async (req, res) => {
    try {
        console.log('🔍 Fetching success stories...'); // Debug log
        
        // First, let's check all funds to see what we have
        const allFunds = await FundingProfile.find({})
            .populate('student', 'fullName');
        
        console.log('📊 All funds in database:', allFunds.map(f => ({
            id: f._id,
            title: f.title,
            status: f.status,
            approved: f.approved,
            hasImpact: !!f.impact,
            impact: f.impact,
            student: f.student?.fullName,
            images: f.images?.length || 0,
            videos: f.videos?.length || 0
        })));

        // Log the query conditions
        console.log('🔎 Query conditions:', {
            status: 'Completed',
            approved: true,
            impact: { $exists: true, $ne: null, $ne: '' }
        });

        // First get all completed and approved funds
        const completedFunds = await FundingProfile.find({
            status: 'Completed',
            approved: true
        })
        .populate('student', 'fullName')
        .sort({ updatedAt: -1 });

        console.log('✅ Found completed funds:', completedFunds.length);

        // Then filter out those without impact statements
        const stories = completedFunds.filter(fund => 
            fund.impact && 
            fund.impact.trim() !== '' && 
            (fund.images.length > 0 || fund.videos.length > 0)
        );

        console.log('📝 Success stories after filtering:', stories.map(s => ({
            id: s._id,
            title: s.title,
            status: s.status,
            approved: s.approved,
            impact: s.impact,
            student: s.student?.fullName,
            images: s.images?.length || 0,
            videos: s.videos?.length || 0
        })));

        const formattedStories = stories.map(story => ({
            id: story._id,
            student: story.student.fullName,
            title: story.title,
            date: story.updatedAt,
            amount: story.goalAmount,
            impact: story.impact,
            media: [
                ...story.images.map(image => ({
                    type: 'image',
                    url: `http://localhost:5000/uploads/${image}`
                })),
                ...story.videos.map(video => ({
                    type: 'video',
                    url: `http://localhost:5000/uploads/${video}`
                }))
            ]
        }));

        console.log('🎨 Formatted stories:', formattedStories.map(s => ({
            id: s.id,
            title: s.title,
            student: s.student,
            mediaCount: s.media.length
        })));

        res.json(formattedStories);
    } catch (error) {
        console.error('❌ Error getting success stories:', error);
        res.status(500).json({ message: 'Error getting success stories' });
    }
};

export const getMyFundingProfiles = async (req, res) => {
    try {
        console.log('Fetching funds for user:', req.user._id); // Debug log
        
        const profiles = await FundingProfile.find({ student: req.user._id })
            .populate('student', 'name email')
            .select('title description goalAmount raisedAmount university eventDate images videos documents status approved donors createdAt')
            .sort({ createdAt: -1 }); // Sort by newest first
        
        console.log('Found profiles:', profiles); // Debug log
        
        if (!profiles || profiles.length === 0) {
            console.log('No profiles found for user'); // Debug log
            return res.json([]); // Return empty array instead of 404
        }
        
        res.json(profiles);
    } catch (error) {
        console.error('Error in getMyFundingProfiles:', error);
        res.status(500).json({ message: 'Error fetching your profiles' });
    }
};

export const getApprovedFundingProfiles = async (req, res) => {
    try {
        console.log('Fetching approved funding profiles...'); // Debug log
        
        const profiles = await FundingProfile.find({ 
            approved: true,
            status: 'Active' // Only show active funds
        })
        .populate('student', 'name email')
        .sort({ createdAt: -1 });
        
        console.log('Found active profiles:', profiles.map(p => ({
            id: p._id,
            title: p.title,
            status: p.status,
            approved: p.approved
        }))); // Debug log with relevant fields
        
        res.json(profiles);
    } catch (error) {
        console.error('Detailed error in getApprovedFundingProfiles:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        res.status(500).json({ 
            message: 'Error fetching approved profiles',
            error: error.message 
        });
    }
};

export const getPendingFunds = async (req, res) => {
    try {
        console.log('Fetching pending funds...'); // Debug log
        const funds = await FundingProfile.find({ status: 'Pending' })
            .populate('student', 'name email')
            .sort({ createdAt: -1 });
        
        console.log('Found pending funds:', funds.length); // Debug log
        res.json(funds);
    } catch (err) {
        console.error('Error in getPendingFunds:', err);
        res.status(500).json({ message: 'Failed to fetch pending funds' });
    }
};

export const approveFund = async (req, res) => {
    try {
        console.log('Approving fund:', req.params.id); // Debug log
        const fund = await FundingProfile.findById(req.params.id);
        if (!fund) return res.status(404).json({ message: 'Fund not found' });
        
        // Set status to Active and mark as approved
        fund.status = 'Active';
        fund.approved = true;
        
        console.log('Updating fund status:', {
            id: fund._id,
            oldStatus: fund.status,
            newStatus: 'Active',
            approved: true
        });

        await fund.save();
        
        // Verify the save worked
        const updatedFund = await FundingProfile.findById(fund._id);
        console.log('Fund after save:', {
            id: updatedFund._id,
            status: updatedFund.status,
            approved: updatedFund.approved
        });

        res.json({ 
            message: 'Fund approved successfully',
            fund: {
                id: updatedFund._id,
                status: updatedFund.status,
                approved: updatedFund.approved
            }
        });
    } catch (err) {
        console.error('Error in approveFund:', err);
        res.status(500).json({ message: 'Approval failed' });
    }
};

export const rejectFund = async (req, res) => {
    try {
        const fund = await FundingProfile.findById(req.params.id);
        if (!fund) return res.status(404).json({ message: 'Fund not found' });
        fund.status = 'Completed';
        fund.approved = false;

        await fund.save();
        res.json({ message: 'Fund rejected successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Rejection failed' });
    }
};

export const addThankNote = async (req, res) => {
    try {
        const { message, donorId } = req.body;
        const fundId = req.params.id;
        const mediaFile = req.file;

        console.log('📝 Adding thank you note:', {
            fundId,
            donorId,
            message,
            mediaFile: mediaFile ? mediaFile.filename : null,
            userId: req.user._id,
            body: req.body
        });

        // Find the fund
        const fund = await FundingProfile.findById(fundId)
            .populate('donors.donor', 'name email');
            
        if (!fund) {
            console.log('❌ Fund not found:', fundId);
            return res.status(404).json({ message: 'Fund not found' });
        }

        console.log('📊 Fund found:', {
            id: fund._id,
            donors: fund.donors.map(d => ({
                donorId: d.donor._id.toString(),
                donorName: d.donor.name,
                amount: d.amount
            }))
        });

        // Find the donor in the fund's donors array
        const donorIndex = fund.donors.findIndex(d => {
            const donorIdStr = d.donor._id.toString();
            console.log('🔍 Comparing donor IDs:', {
                stored: donorIdStr,
                received: donorId,
                match: donorIdStr === donorId
            });
            return donorIdStr === donorId;
        });

        console.log('🔎 Donor search result:', {
            donorIndex,
            donorId,
            totalDonors: fund.donors.length
        });

        if (donorIndex === -1) {
            console.log('❌ Donor not found in fund:', {
                donorId,
                fundId,
                donors: fund.donors.map(d => d.donor._id.toString())
            });
            return res.status(404).json({ 
                message: 'Donor not found for this fund',
                details: {
                    requestedDonorId: donorId,
                    availableDonors: fund.donors.map(d => d.donor._id.toString())
                }
            });
        }

        // Create thank you note object
        const thankYouNote = {
            message,
            media: mediaFile ? mediaFile.filename : null,
            createdAt: new Date()
        };

        // Add the thank you note to the donor's thankYouNotes array
        if (!fund.donors[donorIndex].thankYouNotes) {
            fund.donors[donorIndex].thankYouNotes = [];
        }
        fund.donors[donorIndex].thankYouNotes.push(thankYouNote);

        // Save the updated fund
        await fund.save();
        console.log('✅ Thank you note added successfully');

        // Return the updated fund with populated donor information
        const updatedFund = await FundingProfile.findById(fundId)
            .populate('donors.donor', 'name email')
            .populate('student', 'fullName email');

        // Log the updated fund data
        console.log('📦 Updated fund data:', {
            id: updatedFund._id,
            donors: updatedFund.donors.map(d => ({
                donorId: d.donor._id.toString(),
                donorName: d.donor.name,
                thankYouNotes: d.thankYouNotes?.length || 0
            }))
        });

        res.json({ 
            message: 'Thank you note added successfully',
            thankYouNote,
            fund: updatedFund
        });
    } catch (err) {
        console.error('❌ Error in addThankNote:', err);
        res.status(500).json({ 
            message: 'Failed to add thank you note',
            error: err.message
        });
    }
};

export const markFundAsComplete = async (req, res) => {
    try {
        console.log('Marking fund as complete:', req.params.id); // Debug log
        const fund = await FundingProfile.findById(req.params.id);
        
        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }

        // Check if the user owns this fund
        if (fund.student.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to mark this fund as complete' });
        }

        // Set both status to Completed and approved to true
        fund.status = 'Completed';
        fund.approved = true;
        
        console.log('Updating fund status:', {
            id: fund._id,
            oldStatus: fund.status,
            newStatus: 'Completed',
            approved: true
        });

        await fund.save();
        
        // Verify the save worked
        const updatedFund = await FundingProfile.findById(fund._id);
        console.log('Fund after save:', {
            id: updatedFund._id,
            status: updatedFund.status,
            approved: updatedFund.approved
        });

        res.json({ 
            message: 'Fund marked as complete successfully',
            fund: {
                id: updatedFund._id,
                status: updatedFund.status,
                approved: updatedFund.approved
            }
        });
    } catch (error) {
        console.error('Error marking fund as complete:', error);
        res.status(500).json({ message: 'Failed to mark fund as complete' });
    }
};

export const addMediaAndImpact = async (req, res) => {
    try {
        console.log('Adding media and impact:', {
            fundId: req.params.id,
            userId: req.user._id,
            body: req.body,
            files: req.files
        });

        const fund = await FundingProfile.findOne({
            _id: req.params.id,
            student: req.user._id
        });

        if (!fund) {
            console.log('Fund not found:', {
                fundId: req.params.id,
                userId: req.user._id
            });
            return res.status(404).json({ message: 'Fund not found' });
        }

        console.log('Found fund:', {
            id: fund._id,
            status: fund.status,
            approved: fund.approved,
            currentImpact: fund.impact
        });

        // Handle media uploads
        const images = req.files['images']?.map(f => f.filename) || [];
        const videos = req.files['videos']?.map(f => f.filename) || [];

        // Update fund with new media and impact
        fund.images.push(...images);
        fund.videos.push(...videos);
        fund.impact = req.body.impact;

        console.log('Updating fund with:', {
            newImages: images,
            newVideos: videos,
            newImpact: req.body.impact
        });

        await fund.save();

        console.log('Fund updated successfully:', {
            id: fund._id,
            status: fund.status,
            approved: fund.approved,
            impact: fund.impact,
            imagesCount: fund.images.length,
            videosCount: fund.videos.length
        });

        res.json({ 
            message: 'Media and impact saved successfully',
            fund: {
                id: fund._id,
                status: fund.status,
                approved: fund.approved,
                impact: fund.impact,
                images: fund.images,
                videos: fund.videos
            }
        });
    } catch (error) {
        console.error('Error adding media and impact:', error);
        res.status(500).json({ message: 'Failed to save media and impact' });
    }
};

export const getThankNotes = async (req, res) => {
    try {
        console.log('🔍 Fetching thank you notes for donor:', req.user._id);
        console.log('🔑 Auth token:', req.headers.authorization);

        if (!req.user || !req.user._id) {
            console.error('❌ No user found in request');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Find all funds where this donor has received thank you notes
        const funds = await FundingProfile.find({
            'donors.donor': req.user._id,
            'donors.thankYouNotes': { $exists: true, $ne: [] }
        })
        .populate('student', 'fullName email')
        .populate('donors.donor', 'name email')
        .select('title donors');

        console.log('📊 Found funds:', funds.length);

        // Extract thank you notes from the funds
        const thankNotes = funds.flatMap(fund => {
            const donor = fund.donors.find(d => d.donor._id.toString() === req.user._id.toString());
            if (!donor || !donor.thankYouNotes) {
                console.log('⚠️ No thank you notes found for fund:', fund._id);
                return [];
            }

            console.log('📝 Found thank you notes for fund:', fund._id, donor.thankYouNotes.length);
            return donor.thankYouNotes.map(note => ({
                _id: note._id,
                message: note.message,
                media: note.media,
                createdAt: note.createdAt,
                student: fund.student,
                fund: {
                    _id: fund._id,
                    title: fund.title
                }
            }));
        });

        // Sort by date, newest first
        thankNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        console.log('📦 Final thank you notes:', thankNotes.length);
        console.log('📦 Thank you notes data:', JSON.stringify(thankNotes, null, 2));

        res.json(thankNotes);
    } catch (err) {
        console.error('❌ Error in getThankNotes:', err);
        res.status(500).json({ message: 'Failed to fetch thank you notes' });
    }
};

// Get fund by ID
export const getFundById = async (req, res) => {
    try {
        console.log('🔍 Fetching fund by ID:', req.params.id);
        
        const fund = await FundingProfile.findById(req.params.id)
            .populate({
                path: 'donors.donor',
                select: 'name email _id',
                model: 'User'  // Explicitly specify the model
            })
            .populate('student', 'fullName email _id')
            .populate('category', 'name');

        if (!fund) {
            console.log('❌ Fund not found:', req.params.id);
            return res.status(404).json({ message: 'Fund not found' });
        }

        console.log('✅ Fund found:', {
            id: fund._id,
            title: fund.title,
            donors: fund.donors.map(d => ({
                donorId: d.donor?._id,
                donorName: d.donor?.name,
                amount: d.amount
            }))
        });

        res.json(fund);
    } catch (error) {
        console.error('❌ Error fetching fund:', error);
        res.status(500).json({ message: 'Error fetching fund', error: error.message });
    }
};