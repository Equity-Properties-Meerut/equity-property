import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: [
        'Apartment',
        'Villa',
        'House',
        'Plot',
        'Commercial',
        'Office Space',
        'Shop',
        'Warehouse',
        'Farmhouse',
      ],
    },
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    transactionType: {
      type: String,
      required: [true, 'Transaction type is required'],
      enum: ['Sale', 'Rent', 'Lease'],
    },
    area: {
      type: Number,
      required: [true, 'Area is required'],
      min: [0, 'Area cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    yearBuilt: {
      type: Number,
      min: [1900, 'Year built must be after 1900'],
      max: [new Date().getFullYear(), 'Year built cannot be in the future'],
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
    displayImage: {
      url: {
        type: String,
        required: [true, 'Display image is required'],
      },
      publicId: {
        type: String,
        required: true,
      },
    },
    additionalImages: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    address: {
      state: {
        type: String,
        default: 'Uttar Pradesh',
        immutable: true,
      },
      city: {
        type: String,
        default: 'Meerut',
        immutable: true,
      },
      area: {
        type: String,
        required: [true, 'Area is required'],
      },
      fullAddress: {
        type: String,
        required: [true, 'Full address is required'],
        trim: true,
      },
      pinCode: {
        type: String,
        required: [true, 'Pin code is required'],
        trim: true,
        match: [/^\d{6}$/, 'Pin code must be 6 digits'],
      },
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
propertySchema.index({ status: 1, createdAt: -1 });
propertySchema.index({ 'address.area': 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ transactionType: 1 });
propertySchema.index({ price: 1 });

const Property = mongoose.model('Property', propertySchema);

export default Property;

