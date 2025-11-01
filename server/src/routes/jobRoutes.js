import express from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  applyForJob,
  updateJobStatus,
  completeJob,
  getMatchedJobs,
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.use(protect);

router.post('/', createJob);
router.get('/', getJobs);
router.get('/matched', getMatchedJobs);
router.get('/:id', getJobById);
router.post('/:id/apply', applyForJob);
router.put('/:id/status', updateJobStatus);
router.put('/:id/complete', completeJob);

export default router;