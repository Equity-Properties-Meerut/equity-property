import GeneralInquiry from '../models/GeneralInquiry.js';

// @desc    Get all general inquiries
// @route   GET /api/general-inquiries
// @access  Private/Admin
export const getGeneralInquiries = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const inquiries = await GeneralInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await GeneralInquiry.countDocuments(query);

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

// @desc    Get single general inquiry
// @route   GET /api/general-inquiries/:id
// @access  Private/Admin
export const getGeneralInquiry = async (req, res, next) => {
  try {
    const inquiry = await GeneralInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'General inquiry not found',
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

// @desc    Create new general inquiry
// @route   POST /api/general-inquiries
// @access  Public
export const createGeneralInquiry = async (req, res, next) => {
  try {
    const inquiry = await GeneralInquiry.create(req.body);

    res.status(201).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update general inquiry status
// @route   PUT /api/general-inquiries/:id
// @access  Private/Admin
export const updateGeneralInquiry = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (status && !['New', 'Responded', 'Closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be New, Responded, or Closed',
      });
    }

    const inquiry = await GeneralInquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'General inquiry not found',
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

// @desc    Delete general inquiry
// @route   DELETE /api/general-inquiries/:id
// @access  Private/Admin
export const deleteGeneralInquiry = async (req, res, next) => {
  try {
    const inquiry = await GeneralInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'General inquiry not found',
      });
    }

    await inquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'General inquiry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get general inquiry stats
// @route   GET /api/general-inquiries/stats
// @access  Private/Admin
export const getGeneralInquiryStats = async (req, res, next) => {
  try {
    const totalInquiries = await GeneralInquiry.countDocuments();
    const newInquiries = await GeneralInquiry.countDocuments({ status: 'New' });
    const respondedInquiries = await GeneralInquiry.countDocuments({
      status: 'Responded',
    });
    const closedInquiries = await GeneralInquiry.countDocuments({ status: 'Closed' });

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
