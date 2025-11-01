import express from 'express';
import {
  upsertSkill,
  getSkills,
  getSkillById,
  updateDemandMetrics,
  getSkillRecommendations,
} from '../controllers/skillController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getSkills);
router.get('/:id', getSkillById);

// Protected routes
router.use(protect);
router.get('/:id/recommendations', getSkillRecommendations);

// Admin only routes
router.post('/', adminOnly, upsertSkill);
router.put('/:id/demand-metrics', adminOnly, updateDemandMetrics);

export default router;