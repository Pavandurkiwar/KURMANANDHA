const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));
router.route('/profile').get(protect, asyncHandler(getUserProfile)).put(protect, asyncHandler(updateUserProfile));

module.exports = router;
