const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  updateOrderToPaid,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(protect, asyncHandler(createOrder)).get(protect, admin, asyncHandler(getOrders));
router.get('/myorders', protect, asyncHandler(getMyOrders));
router.get('/:id', protect, asyncHandler(getOrderById));
router.put('/:id/pay', protect, asyncHandler(updateOrderToPaid));
router.put('/:id/status', protect, admin, asyncHandler(updateOrderStatus));

module.exports = router;
