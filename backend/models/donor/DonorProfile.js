import mongoose from 'mongoose';

const donorProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    organization: {
        type: String
    },
    occupation: {
        type: String
    },
    address: {
        type: String
    },
    contactNumber: {
        type: String
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    verificationNotes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
donorProfileSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const DonorProfile = mongoose.model('DonorProfile', donorProfileSchema);

export default DonorProfile; 