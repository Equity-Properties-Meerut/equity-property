import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
export const getInquiries = async (req, res, next) => {
  try {
    const { status, property, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (property) query.property = property;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const inquiries = await Inquiry.find(query)
      .populate('property', 'title price address')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Inquiry.countDocuments(query);

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single inquiry
// @route   GET /api/inquiries/:id
// @access  Private/Admin
export const getInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate(
      'property',
      'title price address displayImage'
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res, next) => {
  try {
    // Verify property exists
    const property = await Property.findById(req.body.property);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
export const updateInquiry = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (status && !['New', 'Responded', 'Closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be New, Responded, or Closed',
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('property', 'title price address');

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    await inquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inquiry stats
// @route   GET /api/inquiries/stats
// @access  Private/Admin
export const getInquiryStats = async (req, res, next) => {
  try {
    const totalInquiries = await Inquiry.countDocuments();
    const newInquiries = await Inquiry.countDocuments({ status: 'New' });
    const respondedInquiries = await Inquiry.countDocuments({
      status: 'Responded',
    });
    const closedInquiries = await Inquiry.countDocuments({ status: 'Closed' });

    res.status(200).json({
      success: true,
      data: {
        totalInquiries,
        newInquiries,
        respondedInquiries,
        closedInquiries,
      },
    });
  } catch (error) {
    next(error);
  }
};

