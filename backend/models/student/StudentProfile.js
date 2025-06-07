import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    contactNumber: {
        type: String,
        required: true
    },
    education: {
        institution: String,
        degree: String,
        fieldOfStudy: String
    },
    documents: [{
        type: String, // Store file paths
        required: true
    }],
    verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    verificationNotes: String,
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
studentProfileSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

export default StudentProfile; 