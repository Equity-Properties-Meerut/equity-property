import Property from '../models/Property.js';
import { deleteImage } from '../config/cloudinary.js';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res, next) => {
  try {
    const {
      status,
      propertyType,
      transactionType,
      area,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    // Build query
    const query = {};

    if (status) {
      query.status = status;
    }
    if (propertyType) {
      query.propertyType = propertyType;
    }
    if (transactionType) {
      query.transactionType = transactionType;
    }
    if (area) {
      query['address.area'] = area;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const properties = await Property.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private/Admin
export const createProperty = async (req, res, next) => {
  try {
    // Add createdBy to req.body
    req.body.createdBy = req.user.id;

    // Parse keyFeatures if it's a JSON string
    if (req.body.keyFeatures && typeof req.body.keyFeatures === 'string') {
      req.body.keyFeatures = JSON.parse(req.body.keyFeatures);
    }

    // Handle images
    if (req.files) {
      if (req.files.displayImage && req.files.displayImage[0]) {
        req.body.displayImage = {
          url: req.files.displayImage[0].path || req.files.displayImage[0].secure_url,
          publicId: req.files.displayImage[0].filename || req.files.displayImage[0].public_id,
        };
      }

      if (req.files.additionalImages) {
        if (req.files.additionalImages.length > 8) {
          return res.status(400).json({
            success: false,
            message: 'Maximum 8 additional images allowed',
          });
        }
        req.body.additionalImages = req.files.additionalImages.map((file) => ({
          url: file.path || file.secure_url,
          publicId: file.filename || file.public_id,
        }));
      }
    }

    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Admin
export const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Parse keyFeatures if it's a JSON string
    if (req.body.keyFeatures && typeof req.body.keyFeatures === 'string') {
      req.body.keyFeatures = JSON.parse(req.body.keyFeatures);
    }

    // Handle display image update
    if (req.files && req.files.displayImage && req.files.displayImage[0]) {
      // Delete old display image
      if (property.displayImage?.publicId) {
        await deleteImage(property.displayImage.publicId);
      }
      req.body.displayImage = {
        url: req.files.displayImage[0].path || req.files.displayImage[0].secure_url,
        publicId: req.files.displayImage[0].filename || req.files.displayImage[0].public_id,
      };
    } else if (req.body.keepExistingDisplayImage === 'true') {
      // Keep existing display image
      req.body.displayImage = property.displayImage;
    }

    // Handle additional images update
    let additionalImages = [];
    
    // Keep existing images that weren't removed
    if (req.body.existingAdditionalImages) {
      const existingIdsToKeep = JSON.parse(req.body.existingAdditionalImages);
      additionalImages = property.additionalImages.filter(img => 
        existingIdsToKeep.includes(img.publicId)
      );
      
      // Delete removed images from Cloudinary
      for (const img of property.additionalImages) {
        if (!existingIdsToKeep.includes(img.publicId) && img.publicId) {
          await deleteImage(img.publicId);
        }
      }
    }

    // Add new additional images
    if (req.files && req.files.additionalImages) {
      const newImages = req.files.additionalImages.map((file) => ({
        url: file.path || file.secure_url,
        publicId: file.filename || file.public_id,
      }));
      
      // Check if total images exceed 8
      const totalImages = additionalImages.length + newImages.length;
      if (totalImages > 8) {
        return res.status(400).json({
          success: false,
          message: 'Maximum 8 additional images allowed. Please remove some existing images first.',
        });
      }
      
      additionalImages = [...additionalImages, ...newImages];
    }

    if (additionalImages.length > 0 || req.body.existingAdditionalImages) {
      req.body.additionalImages = additionalImages;
    }

    // Remove temporary fields
    delete req.body.keepExistingDisplayImage;
    delete req.body.existingAdditionalImages;

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Delete images from Cloudinary
    if (property.displayImage?.publicId) {
      await deleteImage(property.displayImage.publicId);
    }

    if (property.additionalImages) {
      for (const img of property.additionalImages) {
        if (img.publicId) {
          await deleteImage(img.publicId);
        }
      }
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property status
// @route   PATCH /api/properties/:id/status
// @access  Private/Admin
export const updatePropertyStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either active or inactive',
      });
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/properties/stats/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalProperties = await Property.countDocuments();
    const activeProperties = await Property.countDocuments({ status: 'active' });
    const inactiveProperties = await Property.countDocuments({
      status: 'inactive',
    });

    // Get properties added in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const propertiesAdded = await Property.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    res.status(200).json({
      success: true,
      data: {
        totalProperties,
        activeProperties,
        inactiveProperties,
        propertiesAdded,
      },
    });
  } catch (error) {
    next(error);
  }
};

