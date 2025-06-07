import mongoose from 'mongoose';

const fundSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    goalAmount: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed', 'rejected'],
        default: 'pending'
    },
    category: {
        type: String,
        required: true
    },
    media: [{
        type: String
    }],
    documents: [{
        type: String
    }],
    donations: [{
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
        message: String
    }],
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
fundSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Fund = mongoose.model('Fund', fundSchema);

export default Fund; 