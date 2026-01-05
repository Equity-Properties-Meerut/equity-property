import express from 'express';
import {
  getInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiryStats,
} from '../controllers/inquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', createInquiry);

// Protected routes (Admin only)
router.get('/stats', protect, authorize('admin'), getInquiryStats);
router.get('/', protect, authorize('admin'), getInquiries);
router.get('/:id', protect, authorize('admin'), getInquiry);
router.put('/:id', protect, authorize('admin'), updateInquiry);
router.delete('/:id', protect, authorize('admin'), deleteInquiry);

export default router;

