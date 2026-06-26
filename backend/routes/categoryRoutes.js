const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(asyncHandler(getCategories)).post(protect, admin, asyncHandler(createCategory));
router.route('/:id').put(protect, admin, asyncHandler(updateCategory)).delete(protect, admin, asyncHandler(deleteCategory));

module.exports = router;
