import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  updatePropertyStatus,
  getDashboardStats,
} from '../controllers/propertyController.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/stats/dashboard', protect, authorize('admin'), getDashboardStats);
router.get('/:id', getProperty);

// Protected routes (Admin only)
router.post(
  '/',
  protect,
  authorize('admin'),
  upload.fields([
    { name: 'displayImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 },
  ]),
  createProperty
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  upload.fields([
    { name: 'displayImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 },
  ]),
  updateProperty
);

router.patch(
  '/:id/status',
  protect,
  authorize('admin'),
  updatePropertyStatus
);

router.delete('/:id', protect, authorize('admin'), deleteProperty);

export default router;

