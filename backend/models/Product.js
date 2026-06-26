const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    benefits: [String],
    cookingInstructions: [String],
    nutritionalValues: {
      calories: String,
      protein: String,
      carbs: String,
      fat: String,
      fiber: String,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    oldPrice: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      default: 0,
    },
    unit: {
      type: String,
      default: 'kg',
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    origin: String,
    aroma: String,
    cookingTime: String,
    bestUsage: String,
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', function (next) {
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  next();
});

module.exports = mongoose.model('Product', productSchema);
