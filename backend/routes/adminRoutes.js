const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  getDashboardStats,
  getCustomers,
  toggleBlockUser,
  getRevenueData,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.use(protect, admin);
router.get('/stats', asyncHandler(getDashboardStats));
router.get('/customers', asyncHandler(getCustomers));
router.put('/customers/:id/block', asyncHandler(toggleBlockUser));
router.get('/revenue-data', asyncHandler(getRevenueData));

module.exports = router;
