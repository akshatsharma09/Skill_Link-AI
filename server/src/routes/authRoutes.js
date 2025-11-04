import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate, userSchemas } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', validate(userSchemas.register), register);
router.post('/login', validate(userSchemas.login), login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, validate(userSchemas.updateProfile), updateProfile);

export default router;
