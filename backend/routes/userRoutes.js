import express from 'express';
import { userAuth, getUserProfile } from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', userAuth);
router.route('/profile').get(protectRoute, getUserProfile);

export default router;
