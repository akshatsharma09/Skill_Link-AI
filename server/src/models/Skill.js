import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: String,
  certifications: [{
    name: String,
    provider: String,
    level: String,
  }],
  averageHourlyRate: {
    amount: Number,
    currency: { type: String, default: 'INR' },
  },
  demandMetrics: {
    currentDemand: { type: Number, min: 0, max: 100 }, // Percentage
    growthRate: Number, // Percentage, can be negative
    lastUpdated: Date,
  },
  relatedSkills: [{
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
    },
    relevanceScore: { type: Number, min: 0, max: 100 },
  }],
  requirements: {
    tools: [String],
    regulations: [String],
    physicalDemands: [String],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, {
  timestamps: true
});

// Index for text search
skillSchema.index({ name: 'text', description: 'text', category: 'text' });

export default mongoose.model('Skill', skillSchema);