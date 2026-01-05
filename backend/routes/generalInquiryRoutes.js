import express from 'express';
import {
  getGeneralInquiries,
  getGeneralInquiry,
  createGeneralInquiry,
  updateGeneralInquiry,
  deleteGeneralInquiry,
  getGeneralInquiryStats,
} from '../controllers/generalInquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', createGeneralInquiry);

// Protected routes (Admin only)
router.get('/stats', protect, authorize('admin'), getGeneralInquiryStats);
router.get('/', protect, authorize('admin'), getGeneralInquiries);
router.get('/:id', protect, authorize('admin'), getGeneralInquiry);
router.put('/:id', protect, authorize('admin'), updateGeneralInquiry);
router.delete('/:id', protect, authorize('admin'), deleteGeneralInquiry);

export default router;

