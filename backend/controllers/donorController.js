import Fund from '../models/fund/Fund.js';
import DonorProfile from '../models/donor/DonorProfile.js';

// @desc    Get donor statistics
// @route   GET /api/donor/stats
// @access  Private
export const getDonorStats = async (req, res) => {
    try {
        const donorId = req.user.id;

        // Get total donations count
        const totalDonations = await Fund.countDocuments({
            'donations.donor': donorId
        });

        // Get total amount donated
        const funds = await Fund.find({
            'donations.donor': donorId
        });

        const amountDonated = funds.reduce((total, fund) => {
            const donorDonations = fund.donations.filter(
                donation => donation.donor.toString() === donorId
            );
            return total + donorDonations.reduce((sum, donation) => sum + donation.amount, 0);
        }, 0);

        // Get unique students supported
        const studentsSupported = new Set(
            funds.flatMap(fund =>
                fund.donations
                    .filter(donation => donation.donor.toString() === donorId)
                    .map(donation => donation.student.toString())
            )
        ).size;

        res.json({
            totalDonations,
            amountDonated,
            studentsSupported
        });
    } catch (error) {
        console.error('Error in getDonorStats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get donor's donations
// @route   GET /api/donor/donations
// @access  Private
export const getDonorDonations = async (req, res) => {
    try {
        const donorId = req.user.id;

        const funds = await Fund.find({
            'donations.donor': donorId
        }).populate('student', 'fullName');

        const donations = funds.flatMap(fund =>
            fund.donations
                .filter(donation => donation.donor.toString() === donorId)
                .map(donation => ({
                    studentName: fund.student.fullName,
                    fundTitle: fund.title,
                    amount: donation.amount,
                    date: donation.date,
                    status: fund.status
                }))
        ).sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(donations);
    } catch (error) {
        console.error('Error in getDonorDonations:', error);
        res.status(500).json({ message: 'Server error' });
    }
}; 