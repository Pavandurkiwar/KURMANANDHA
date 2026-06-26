const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  getProducts,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getRelatedProducts,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(asyncHandler(getProducts)).post(protect, admin, asyncHandler(createProduct));
router.get('/featured', asyncHandler(getFeaturedProducts));
router.get('/slug/:slug', asyncHandler(getProductBySlug));
router.get('/:id/related', asyncHandler(getRelatedProducts));
router
  .route('/:id')
  .get(asyncHandler(getProductById))
  .put(protect, admin, asyncHandler(updateProduct))
  .delete(protect, admin, asyncHandler(deleteProduct));
router.route('/:id/reviews').post(protect, asyncHandler(createProductReview));

module.exports = router;
