import { useState } from 'react';
import { HiOutlineSearch, HiOutlineXCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';

const initialCustomers = [
  { _id: '1', name: 'Priya Sharma', email: 'priya@email.com', phone: '9876543210', orders: 12, totalSpent: 12560, status: 'Active', joined: '2025-01-15' },
  { _id: '2', name: 'Rahul Verma', email: 'rahul@email.com', phone: '9876543211', orders: 8, totalSpent: 8450, status: 'Active', joined: '2025-03-20' },
  { _id: '3', name: 'Anita Patel', email: 'anita@email.com', phone: '9876543212', orders: 5, totalSpent: 3200, status: 'Active', joined: '2025-06-10' },
  { _id: '4', name: 'Vikram Singh', email: 'vikram@email.com', phone: '9876543213', orders: 15, totalSpent: 18900, status: 'Active', joined: '2024-11-05' },
  { _id: '5', name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '9876543214', orders: 3, totalSpent: 2100, status: 'Blocked', joined: '2025-08-01' },
];

export default function AdminCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBlock = (id) => {
    setCustomers(customers.map((c) => {
      if (c._id === id) {
        const newStatus = c.status === 'Active' ? 'Blocked' : 'Active';
        toast.success(`${c.name} ${newStatus === 'Blocked' ? 'blocked' : 'unblocked'}`);
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Customers</h1>
          <p className="text-dark-300 text-sm mt-1">Manage your customer base</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-300" />
        <input
          type="text"
          placeholder="Search customers..."
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
                <th className="text-left px-6 py-4 font-semibold text-dark-300 text-sm">Customer</th>
                <th className="text-left px-6 py-4 font-semibold text-dark-300 text-sm">Email</th>
                <th className="text-left px-6 py-4 font-semibold text-dark-300 text-sm">Phone</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Orders</th>
                <th className="text-right px-6 py-4 font-semibold text-dark-300 text-sm">Total Spent</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Joined</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Status</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-500">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark-300">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4 text-center font-medium">{customer.orders}</td>
                  <td className="px-6 py-4 text-right font-semibold">₹{customer.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center text-dark-300 text-sm">{customer.joined}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`badge ${customer.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleBlock(customer._id)}
                      className={`p-2 rounded-lg transition-colors ${
                        customer.status === 'Active'
                          ? 'hover:bg-red-50 text-red-500'
                          : 'hover:bg-green-50 text-green-500'
                      }`}
                      title={customer.status === 'Active' ? 'Block User' : 'Unblock User'}
                    >
                      {customer.status === 'Active' ? (
                        <HiOutlineXCircle className="w-5 h-5" />
                      ) : (
                        <HiOutlineCheckCircle className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-dark-300">No customers found</div>
        )}
      </div>
    </div>
  );
}
