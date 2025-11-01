import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  skillsRequired: [{
    type: String,
    required: true,
  }],
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'in-progress', 'completed', 'cancelled'],
    default: 'open',
  },
  type: {
    type: String,
    enum: ['one-time', 'recurring'],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: { type: String, required: true },
  },
  schedule: {
    startDate: { type: Date, required: true },
    endDate: Date,
    isFlexible: { type: Boolean, default: false },
    duration: { type: Number }, // in hours
  },
  budget: {
    type: { type: String, enum: ['fixed', 'hourly'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
  },
  requirements: {
    experienceNeeded: Number,
    certificatesRequired: [String],
    toolsProvided: { type: Boolean, default: false },
    additionalDetails: String,
  },
  applications: [{
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    proposal: String,
    quotedPrice: Number,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  completion: {
    completedAt: Date,
    rating: {
      byBusiness: {
        rating: Number,
        review: String,
      },
      byWorker: {
        rating: Number,
        review: String,
      },
    },
    proofOfWork: [{
      type: { type: String, enum: ['image', 'document', 'video'] },
      url: String,
      description: String,
    }],
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'partial', 'completed', 'refunded'],
      default: 'pending',
    },
    transactions: [{
      type: { type: String, enum: ['advance', 'final', 'refund'] },
      amount: Number,
      status: String,
      transactionId: String,
      timestamp: Date,
    }],
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'immediate'],
    default: 'medium',
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'invite-only'],
    default: 'public',
  },
  aiMatchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
}, {
  timestamps: true
});

// Index for geolocation queries
jobSchema.index({ "location.coordinates": "2dsphere" });
// Index for search queries
jobSchema.index({ title: 'text', description: 'text', category: 'text' });

export default mongoose.model('Job', jobSchema);