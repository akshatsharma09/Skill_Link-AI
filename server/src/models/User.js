import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['worker', 'business', 'admin'],
    required: true,
  },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    avatar: { type: String },
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
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
    },
  },
  businessDetails: {
    businessName: { type: String },
    businessType: { type: String },
    gstin: { type: String }, // for Indian businesses
    registrationNumber: { type: String },
  },
  workerDetails: {
    skills: [{
      skill: { type: String, required: true },
      experience: { type: Number, required: true }, // in years
      hourlyRate: { type: Number, required: true },
      certificates: [String],
    }],
    availability: {
      schedule: [{
        day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
        slots: [{
          start: String,
          end: String,
        }],
      }],
      isAvailableNow: { type: Boolean, default: false },
    },
    verificationStatus: {
      isVerified: { type: Boolean, default: false },
      documents: [{
        type: { type: String, enum: ['id', 'address', 'qualification', 'background'] },
        url: String,
        verified: { type: Boolean, default: false },
      }],
    },
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    radius: { type: Number, default: 25 }, // in kilometers
    language: { type: String, default: 'en' },
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true
});

// Index for geolocation queries
userSchema.index({ "profile.location.coordinates": "2dsphere" });

export default mongoose.model('User', userSchema);