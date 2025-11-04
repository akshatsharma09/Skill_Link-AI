import Skill from '../models/Skill.js';
import logger from '../utils/logger.js';
import { AppError } from '../utils/logger.js';
import User from '../models/User.js';
import Job from '../models/Job.js';

// Create or update skill
export const upsertSkill = async (req, res) => {
  try {
    const { name, category, description, certifications, averageHourlyRate, requirements } = req.body;

    const skill = await Skill.findOneAndUpdate(
      { name },
      {
        name,
        category,
        description,
        certifications,
        averageHourlyRate,
        requirements,
        'demandMetrics.lastUpdated': new Date(),
      },
      { upsert: true, new: true }
    );

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all skills with filters and pagination
export const getSkills = async (req, res) => {
  try {
    const { category, search, sortBy = 'demandMetrics.currentDemand', page = 1, limit = 10 } = req.query;

    let query = { status: 'active' };
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$text = { $search: search };
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { [sortBy]: -1 }
    };

    const result = await Skill.paginate(query, options);

    res.json({
      success: true,
      data: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalSkills: result.totalDocs,
        hasNext: result.hasNextPage,
        hasPrev: result.hasPrevPage,
      }
    });
  } catch (error) {
    logger.error('Error fetching skills:', error);
    throw new AppError('Error fetching skills', 500);
  }
};

// Get skill details by ID
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      res.json(skill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update skill demand metrics
export const updateDemandMetrics = async (req, res) => {
  try {
    const skillId = req.params.id;
    
    // Get recent job postings requiring this skill
    const recentJobs = await Job.find({
      skillsRequired: skillId,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 days
    });

    // Get workers with this skill
    const workers = await User.find({
      'workerDetails.skills.skill': skillId,
      role: 'worker',
    });

    // Calculate demand metrics
    const demandScore = calculateDemandScore(recentJobs.length, workers.length);
    const growthRate = calculateGrowthRate(recentJobs);

    const skill = await Skill.findByIdAndUpdate(
      skillId,
      {
        $set: {
          'demandMetrics.currentDemand': demandScore,
          'demandMetrics.growthRate': growthRate,
          'demandMetrics.lastUpdated': new Date(),
        },
      },
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get skill recommendations for a worker
export const getSkillRecommendations = async (req, res) => {
  try {
    const worker = await User.findById(req.params.id);
    if (!worker || worker.role !== 'worker') {
      return res.status(400).json({ message: 'Worker not found' });
    }

    // Get worker's current skills
    const currentSkills = worker.workerDetails.skills.map((s) => s.skill);

    // Find related skills based on current skills
    const relatedSkills = await Skill.find({
      name: { $nin: currentSkills },
      'relatedSkills.skillId': { $in: currentSkills },
    }).sort({ 'demandMetrics.currentDemand': -1 });

    // Get high-demand skills in worker's region
    const highDemandSkills = await getHighDemandSkillsInRegion(
      worker.profile.location.coordinates,
      worker.preferences.radius
    );

    // Combine and score recommendations
    const recommendations = combineAndScoreRecommendations(
      relatedSkills,
      highDemandSkills,
      worker
    );

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate demand score
const calculateDemandScore = (jobCount, workerCount) => {
  if (workerCount === 0) return 100; // Maximum demand when no workers available
  const ratio = jobCount / workerCount;
  return Math.min(Math.round(ratio * 50), 100); // Scale and cap at 100
};

// Helper function to calculate growth rate
const calculateGrowthRate = (recentJobs) => {
  const now = new Date();
  const fifteenDaysAgo = new Date(now - 15 * 24 * 60 * 60 * 1000);

  const recentJobsCount = recentJobs.filter(
    (job) => job.createdAt >= fifteenDaysAgo
  ).length;
  const olderJobsCount = recentJobs.filter(
    (job) => job.createdAt < fifteenDaysAgo
  ).length;

  if (olderJobsCount === 0) return 100; // New skill with only recent jobs
  return Math.round(((recentJobsCount - olderJobsCount) / olderJobsCount) * 100);
};

// Helper function to get high-demand skills in a region
const getHighDemandSkillsInRegion = async (coordinates, radius) => {
  const recentJobs = await Job.find({
    'location.coordinates': {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates,
        },
        $maxDistance: radius * 1000, // Convert km to meters
      },
    },
    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // Last 30 days
  });

  // Count skill frequency in jobs
  const skillFrequency = {};
  recentJobs.forEach((job) => {
    job.skillsRequired.forEach((skill) => {
      skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
    });
  });

  // Get skills with their demand data
  const skills = await Skill.find({
    name: { $in: Object.keys(skillFrequency) },
  });

  return skills.map((skill) => ({
    ...skill.toObject(),
    localDemand: (skillFrequency[skill.name] / recentJobs.length) * 100,
  }));
};

// Helper function to combine and score recommendations
const combineAndScoreRecommendations = (relatedSkills, highDemandSkills, worker) => {
  const recommendations = new Map();

  // Score related skills
  relatedSkills.forEach((skill) => {
    const score = calculateRecommendationScore(skill, worker, 0.6);
    recommendations.set(skill._id.toString(), {
      skill,
      score,
      reason: 'Related to your current skills',
    });
  });

  // Score high-demand skills
  highDemandSkills.forEach((skill) => {
    const existingRec = recommendations.get(skill._id.toString());
    const score = calculateRecommendationScore(skill, worker, 0.4);

    if (existingRec) {
      existingRec.score = Math.max(existingRec.score, score);
      existingRec.reason += ' and in high demand in your area';
    } else {
      recommendations.set(skill._id.toString(), {
        skill,
        score,
        reason: 'High demand in your area',
      });
    }
  });

  // Convert to array and sort by score
  return Array.from(recommendations.values()).sort((a, b) => b.score - a.score);
};

// Helper function to calculate recommendation score
const calculateRecommendationScore = (skill, worker, weight) => {
  let score = 0;

  // Base score from skill demand
  score += (skill.demandMetrics.currentDemand || 0) * 0.4;

  // Growth rate impact
  score += (skill.demandMetrics.growthRate || 0) * 0.3;

  // Local demand impact (if available)
  if (skill.localDemand) {
    score += skill.localDemand * 0.3;
  }

  // Apply category familiarity bonus
  const workerCategories = new Set(
    worker.workerDetails.skills.map((s) => s.category)
  );
  if (workerCategories.has(skill.category)) {
    score *= 1.2; // 20% bonus for familiar categories
  }

  return Math.round(score * weight);
};

export default {
  upsertSkill,
  getSkills,
  getSkillById,
  updateDemandMetrics,
  getSkillRecommendations,
};