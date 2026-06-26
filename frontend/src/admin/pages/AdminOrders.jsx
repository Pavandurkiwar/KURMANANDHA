import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineEye } from 'react-icons/hi';
import toast from 'react-hot-toast';

const initialOrders = [
  { _id: 'ORD001', customer: 'Priya Sharma', email: 'priya@email.com', items: 3, total: 567, status: 'Delivered', date: '2026-06-10', payment: 'COD' },
  { _id: 'ORD002', customer: 'Rahul Verma', email: 'rahul@email.com', items: 1, total: 189, status: 'Processing', date: '2026-06-10', payment: 'UPI' },
  { _id: 'ORD003', customer: 'Anita Patel', email: 'anita@email.com', items: 2, total: 380, status: 'Shipped', date: '2026-06-09', payment: 'Card' },
  { _id: 'ORD004', customer: 'Vikram Singh', email: 'vikram@email.com', items: 5, total: 945, status: 'Pending', date: '2026-06-09', payment: 'COD' },
  { _id: 'ORD005', customer: 'Lakshmi Devi', email: 'lakshmi@email.com', items: 2, total: 290, status: 'Delivered', date: '2026-06-08', payment: 'UPI' },
  { _id: 'ORD006', customer: 'Rajesh Kumar', email: 'rajesh@email.com', items: 4, total: 756, status: 'Pending', date: '2026-06-07', payment: 'COD' },
  { _id: 'ORD007', customer: 'Meena Sharma', email: 'meena@email.com', items: 1, total: 145, status: 'Cancelled', date: '2026-06-07', payment: 'UPI' },
];

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Processing: 'badge-primary',
  Shipped: 'badge-gold',
  Delivered: 'badge-success',
  Cancelled: 'badge-danger',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter((o) =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o._id.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map((o) => o._id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order ${id} updated to ${newStatus}`);
  };

  const generateInvoice = (order) => {
    toast.success(`Invoice generated for ${order._id}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Orders</h1>
          <p className="text-dark-300 text-sm mt-1">Manage customer orders</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-300" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-12"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-4 font-semibold text-dark-300 text-sm">Order ID</th>
                <th className="text-left px-6 py-4 font-semibold text-dark-300 text-sm">Customer</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Items</th>
                <th className="text-right px-6 py-4 font-semibold text-dark-300 text-sm">Total</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Payment</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Status</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Date</th>
                <th className="text-right px-6 py-4 font-semibold text-dark-300 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm font-medium">{order._id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-xs text-dark-300">{order.email}</p>
                  </td>
                  <td className="px-6 py-4 text-center">{order.items}</td>
                  <td className="px-6 py-4 text-right font-semibold">₹{order.total}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm">{order.payment}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer outline-none ${statusColors[order.status]}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-dark-300">{order.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => generateInvoice(order)}
                        className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-dark-300">No orders found</div>
        )}
      </div>

      {/* Order Detail Panel */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="font-display font-bold text-lg mb-4">Order Details — {selectedOrder._id}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-dark-300">Customer</p>
              <p className="font-semibold mt-1">{selectedOrder.customer}</p>
              <p className="text-sm text-dark-300">{selectedOrder.email}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-dark-300">Total Amount</p>
              <p className="font-semibold mt-1 text-xl text-primary-500">₹{selectedOrder.total}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-dark-300">Payment</p>
              <p className="font-semibold mt-1">{selectedOrder.payment}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-dark-300">Date</p>
              <p className="font-semibold mt-1">{selectedOrder.date}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
