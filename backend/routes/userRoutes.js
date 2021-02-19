import express from 'express';
import {
  userAuth,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', userAuth);
router.route('/profile').get(protectRoute, getUserProfile);

export default router;
