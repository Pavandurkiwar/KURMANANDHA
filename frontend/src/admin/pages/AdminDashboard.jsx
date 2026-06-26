import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineShoppingCart, HiOutlineUsers, HiOutlineCube, HiOutlineCash } from 'react-icons/hi';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const stats = [
  { label: 'Total Orders', value: '156', change: '+12%', icon: HiOutlineShoppingCart, color: 'from-blue-500 to-blue-600' },
  { label: 'Total Customers', value: '1,234', change: '+8%', icon: HiOutlineUsers, color: 'from-green-500 to-green-600' },
  { label: 'Total Products', value: '48', change: '+3', icon: HiOutlineCube, color: 'from-purple-500 to-purple-600' },
  { label: 'Total Revenue', value: '₹2,45,890', change: '+18%', icon: HiOutlineCash, color: 'from-gold-400 to-gold-500' },
];

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Revenue',
    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 38000, 42000, 45000],
    borderColor: '#2F855A',
    backgroundColor: 'rgba(47, 133, 90, 0.1)',
    fill: true,
    tension: 0.4,
  }],
};

const barData = {
  labels: ['Basmati', 'Sona Masoori', 'Brown Rice', 'Kolam', 'Ponni', 'Jeera'],
  datasets: [{
    label: 'Sales (units)',
    data: [450, 380, 290, 210, 180, 160],
    backgroundColor: 'rgba(47, 133, 90, 0.7)',
    borderRadius: 8,
  }],
};

const doughnutData = {
  labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  datasets: [{
    data: [23, 18, 12, 95, 8],
    backgroundColor: ['#F59E0B', '#3B82F6', '#8B5CF6', '#10B981', '#EF4444'],
  }],
};

const recentOrders = [
  { id: '#ORD001', customer: 'Priya Sharma', items: 3, total: 567, status: 'Delivered', date: '2026-06-10' },
  { id: '#ORD002', customer: 'Rahul Verma', items: 1, total: 189, status: 'Processing', date: '2026-06-10' },
  { id: '#ORD003', customer: 'Anita Patel', items: 2, total: 380, status: 'Shipped', date: '2026-06-09' },
  { id: '#ORD004', customer: 'Vikram Singh', items: 5, total: 945, status: 'Pending', date: '2026-06-09' },
  { id: '#ORD005', customer: 'Lakshmi Devi', items: 2, total: 290, status: 'Delivered', date: '2026-06-08' },
];

const chartOptions = {
  responsive: true,
  plugins: { legend: { position: 'bottom' } },
  scales: { y: { beginAtZero: true } },
};

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-1">Dashboard Overview</h1>
      <p className="text-dark-300 mb-8">Track your business performance at a glance</p>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-dark-300 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-green-500 text-sm mt-3 font-medium">{stat.change} from last month</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-4">Revenue Trend</h3>
          <Line data={lineData} options={chartOptions} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-4">Top Products</h3>
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-lg mb-4">Order Status</h3>
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">Recent Orders</h3>
            <Link to="/admin/orders" className="text-sm text-primary-500 hover:text-primary-600 font-medium">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 font-semibold text-dark-300">Order</th>
                  <th className="text-left py-3 font-semibold text-dark-300">Customer</th>
                  <th className="text-center py-3 font-semibold text-dark-300">Items</th>
                  <th className="text-right py-3 font-semibold text-dark-300">Total</th>
                  <th className="text-center py-3 font-semibold text-dark-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3 text-center">{order.items}</td>
                    <td className="py-3 text-right font-semibold">₹{order.total}</td>
                    <td className="py-3 text-center">
                      <span className={`badge ${
                        order.status === 'Delivered' ? 'badge-success' :
                        order.status === 'Processing' ? 'badge-primary' :
                        order.status === 'Shipped' ? 'badge-gold' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'badge-danger'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
