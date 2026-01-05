import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property reference is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Responded', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
inquirySchema.index({ property: 1, createdAt: -1 });
inquirySchema.index({ status: 1 });
inquirySchema.index({ email: 1 });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;

