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
import { validate, jobSchemas } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Protected routes
router.use(protect);

router.post('/', validate(jobSchemas.create), createJob);
router.get('/', getJobs);
router.get('/matched', getMatchedJobs);
router.get('/:id', getJobById);
router.post('/:id/apply', validate(jobSchemas.apply), applyForJob);
router.put('/:id/status', validate(jobSchemas.updateStatus), updateJobStatus);
router.put('/:id/complete', validate(jobSchemas.complete), completeJob);

export default router;
