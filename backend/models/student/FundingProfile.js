import mongoose from 'mongoose';

const fundingProfileSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    goalAmount: {
        type: Number,
        required: true
    },
    raisedAmount: {
        type: Number,
        default: 0
    },
    university: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        default: Date.now
    },
    images: [String],
    videos: [String],
    documents: [String],
    impact: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Pending', 'Active', 'Completed'],
        default: 'Pending'
    },
    approved: {
        type: Boolean,
        default: false
    },
    donors: [{
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        thankingOptions: {
            type: String,
            default: ''
        },
        thankYouNotes: [{
            message: {
                type: String,
                required: true
            },
            media: {
                type: String // URL to thank you media (image/video)
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to handle status transitions
fundingProfileSchema.pre('save', function(next) {
    console.log('Pre-save hook triggered:', {
        currentStatus: this.status,
        isApproved: this.approved,
        eventDate: this.eventDate,
        isModified: this.isModified('status')
    });

    // If status is being modified, respect that change
    if (this.isModified('status')) {
        console.log('Status was explicitly modified, keeping the change');
        return next();
    }

    next();
});

// Add validation to prevent invalid status transitions
fundingProfileSchema.pre('validate', function(next) {
    console.log('Validation hook triggered:', {
        currentStatus: this.status,
        isApproved: this.approved,
        isModified: this.isModified('status')
    });

    // If status is being modified
    if (this.isModified('status')) {
        // Can't go from Pending to Completed without being Active first
        if (this.status === 'Completed' && !this.approved) {
            this.invalidate('status', 'Fund must be approved before being marked as completed');
        }
    }

    next();
});

const FundingProfile = mongoose.model('FundingProfile', fundingProfileSchema);
export default FundingProfile;
