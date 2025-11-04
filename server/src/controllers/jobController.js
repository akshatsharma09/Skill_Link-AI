import mongoose from 'mongoose';
import Job from '../models/Job.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';
import { AppError } from '../utils/logger.js';

// Create a new job
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      businessId: req.user._id,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs with filters and pagination
export const getJobs = async (req, res) => {
  try {
    const {
      category,
      skills,
      location,
      radius = 25, // default 25km
      status = 'open',
      type,
      minBudget,
      maxBudget,
      urgency,
      page = 1,
      limit = 10,
    } = req.query;

    let query = { status };

    // Category filter
    if (category) {
      query.category = category;
    }

    // Skills filter
    if (skills) {
      query.skillsRequired = { $in: skills.split(',') };
    }

    // Location filter with radius
    if (location) {
      const [lng, lat] = location.split(',').map(Number);
      query['location.coordinates'] = {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: radius * 1000, // Convert km to meters
        },
      };
    }

    // Type filter
    if (type) {
      query.type = type;
    }

    // Budget range filter
    if (minBudget || maxBudget) {
      query['budget.amount'] = {};
      if (minBudget) query['budget.amount'].$gte = Number(minBudget);
      if (maxBudget) query['budget.amount'].$lte = Number(maxBudget);
    }

    // Urgency filter
    if (urgency) {
      query.urgency = urgency;
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: {
        path: 'businessId',
        select: 'profile.firstName profile.lastName businessDetails.businessName'
      }
    };

    const result = await Job.paginate(query, options);

    res.json({
      success: true,
      data: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalJobs: result.totalDocs,
        hasNext: result.hasNextPage,
        hasPrev: result.hasPrevPage,
      }
    });
  } catch (error) {
    logger.error('Error fetching jobs:', error);
    throw new AppError('Error fetching jobs', 500);
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('businessId', 'profile.firstName profile.lastName businessDetails.businessName')
      .populate('workerId', 'profile.firstName profile.lastName workerDetails.skills');

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { proposal, quotedPrice } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if worker has already applied
    const alreadyApplied = job.applications.find(
      (app) => app.workerId.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    job.applications.push({
      workerId: req.user._id,
      proposal,
      quotedPrice,
    });

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update job status
export const updateJobStatus = async (req, res) => {
  try {
    const { status, workerId } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job owner
    if (job.businessId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    job.status = status;
    if (status === 'assigned' && workerId) {
      job.workerId = workerId;
    }

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete job and add review
export const completeJob = async (req, res) => {
  try {
    const { rating, review, proofOfWork } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check authorization
    const isBusinessOwner = job.businessId.toString() === req.user._id.toString();
    const isAssignedWorker = job.workerId.toString() === req.user._id.toString();

    if (!isBusinessOwner && !isAssignedWorker) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update completion details
    if (!job.completion) {
      job.completion = {};
    }

    if (isBusinessOwner) {
      job.completion.rating = {
        ...job.completion.rating,
        byBusiness: { rating, review },
      };
    }

    if (isAssignedWorker) {
      job.completion.rating = {
        ...job.completion.rating,
        byWorker: { rating, review },
      };
      if (proofOfWork) {
        job.completion.proofOfWork = proofOfWork;
      }
    }

    // If both parties have reviewed, mark as completed
    if (
      job.completion.rating?.byBusiness?.rating &&
      job.completion.rating?.byWorker?.rating
    ) {
      job.status = 'completed';
      job.completion.completedAt = new Date();

      // Update worker's rating
      const worker = await User.findById(job.workerId);
      if (worker) {
        const newRatingCount = worker.ratings.count + 1;
        const newRatingAverage =
          (worker.ratings.average * worker.ratings.count +
            job.completion.rating.byBusiness.rating) /
          newRatingCount;

        worker.ratings = {
          average: newRatingAverage,
          count: newRatingCount,
        };
        await worker.save();
      }
    }

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AI-based job matching
export const getMatchedJobs = async (req, res) => {
  try {
    const worker = await User.findById(req.user._id);
    if (!worker || worker.role !== 'worker') {
      return res.status(400).json({ message: 'Worker profile required' });
    }

    // Get worker's skills
    const workerSkills = worker.workerDetails.skills.map((s) => s.skill);

    // Find jobs matching worker's skills
    const jobs = await Job.find({
      status: 'open',
      skillsRequired: { $in: workerSkills },
      'location.coordinates': {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: worker.profile.location.coordinates,
          },
          $maxDistance: worker.preferences.radius * 1000, // Convert km to meters
        },
      },
    }).populate('businessId', 'profile.firstName profile.lastName businessDetails.businessName');

    // Calculate AI match score for each job
    const matchedJobs = jobs.map((job) => {
      const matchScore = calculateJobMatchScore(job, worker);
      return {
        ...job.toObject(),
        aiMatchScore: matchScore,
      };
    });

    // Sort by match score
    matchedJobs.sort((a, b) => b.aiMatchScore - a.aiMatchScore);

    res.json(matchedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate job match score
const calculateJobMatchScore = (job, worker) => {
  let score = 0;
  const weights = {
    skills: 0.4,
    experience: 0.2,
    location: 0.2,
    availability: 0.1,
    rating: 0.1,
  };

  // Skills match
  const skillMatchCount = job.skillsRequired.filter((skill) =>
    worker.workerDetails.skills.some((s) => s.skill === skill)
  ).length;
  score += weights.skills * (skillMatchCount / job.skillsRequired.length);

  // Experience match
  const requiredExp = job.requirements.experienceNeeded || 0;
  const workerAvgExp =
    worker.workerDetails.skills.reduce((sum, s) => sum + s.experience, 0) /
    worker.workerDetails.skills.length;
  score += weights.experience * Math.min(workerAvgExp / requiredExp, 1);

  // Location proximity
  const maxDistance = worker.preferences.radius * 1000; // in meters
  const actualDistance = calculateDistance(
    job.location.coordinates,
    worker.profile.location.coordinates
  );
  score += weights.location * (1 - actualDistance / maxDistance);

  // Availability match (simplified)
  if (worker.workerDetails.availability.isAvailableNow) {
    score += weights.availability;
  }

  // Rating match
  score += weights.rating * (worker.ratings.average / 5);

  return Math.round(score * 100); // Convert to percentage
};

// Helper function to calculate distance between coordinates
const calculateDistance = (coords1, coords2) => {
  // Implement Haversine formula or use a geospatial library
  // This is a simplified version
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
};

export default {
  createJob,
  getJobs,
  getJobById,
  applyForJob,
  updateJobStatus,
  completeJob,
  getMatchedJobs,
};