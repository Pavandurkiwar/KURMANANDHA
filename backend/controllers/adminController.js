const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalCustomers = await User.countDocuments({ isAdmin: false });
  const totalProducts = await Product.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);

  const orders = await Order.find().sort('-createdAt').limit(5).populate('user', 'name');

  res.json({
    totalOrders,
    totalCustomers,
    totalProducts,
    totalRevenue: totalRevenue[0]?.total || 0,
    recentOrders: orders,
  });
};

// @desc    Get all customers (Admin)
// @route   GET /api/admin/customers
const getCustomers = async (req, res) => {
  const keyword = req.query.search
    ? { name: { $regex: req.query.search, $options: 'i' } }
    : {};
  const customers = await User.find({ isAdmin: false, ...keyword }).sort('-createdAt');
  res.json(customers);
};

// @desc    Block/unblock user (Admin)
// @route   PUT /api/admin/customers/:id/block
const toggleBlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Get admin revenue data for charts
// @route   GET /api/admin/revenue-data
const getRevenueData = async (req, res) => {
  const revenueData = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        revenue: { $sum: '$totalPrice' },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 12 },
  ]);

  const topProducts = await Order.aggregate([
    { $unwind: '$orderItems' },
    {
      $group: {
        _id: '$orderItems.name',
        totalSold: { $sum: '$orderItems.quantity' },
        revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
  ]);

  res.json({ revenueData, topProducts });
};

module.exports = {
  getDashboardStats,
  getCustomers,
  toggleBlockUser,
  getRevenueData,
};
