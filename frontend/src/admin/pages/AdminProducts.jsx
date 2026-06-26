import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch } from 'react-icons/hi';
import toast from 'react-hot-toast';

const initialProducts = [
  { _id: '1', name: 'Premium Basmati Rice', category: 'Basmati', price: 189, stock: 50, status: 'Active' },
  { _id: '2', name: 'Sona Masoori Rice', category: 'Sona Masoori', price: 145, stock: 30, status: 'Active' },
  { _id: '3', name: 'Organic Brown Rice', category: 'Brown Rice', price: 220, stock: 25, status: 'Active' },
  { _id: '4', name: 'Kolam Rice', category: 'Kolam', price: 160, stock: 0, status: 'Inactive' },
  { _id: '5', name: 'Jeera Rice', category: 'Jeera', price: 175, stock: 40, status: 'Active' },
];

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '' });

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', category: '', price: '', stock: '' });
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({ name: product.name, category: product.category, price: String(product.price), stock: String(product.stock) });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.category || !form.price) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (editing) {
      setProducts(products.map((p) =>
        p._id === editing._id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p
      ));
      toast.success('Product updated!');
    } else {
      setProducts([...products, {
        _id: String(Date.now()),
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        status: 'Active',
      }]);
      toast.success('Product added!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p._id !== id));
      toast.success('Product deleted');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Products</h1>
          <p className="text-dark-300 text-sm mt-1">Manage your product inventory</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 px-6 py-2.5">
          <HiOutlinePlus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-300" />
        <input
          type="text"
          placeholder="Search products..."
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
                <th className="text-left px-6 py-4 font-semibold text-dark-300 text-sm">Product</th>
                <th className="text-left px-6 py-4 font-semibold text-dark-300 text-sm">Category</th>
                <th className="text-right px-6 py-4 font-semibold text-dark-300 text-sm">Price</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Stock</th>
                <th className="text-center px-6 py-4 font-semibold text-dark-300 text-sm">Status</th>
                <th className="text-right px-6 py-4 font-semibold text-dark-300 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-dark-300">{product.category}</td>
                  <td className="px-6 py-4 text-right font-semibold">₹{product.price}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-medium ${product.stock === 0 ? 'text-red-500' : ''}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`badge ${product.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(product)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors">
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-dark-300">No products found</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-display font-bold mb-6">
                {editing ? 'Edit Product' : 'Add Product'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Product Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Product name" />
                </div>
                <div>
                  <label className="block font-medium mb-2">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                    <option value="">Select category</option>
                    <option value="Basmati">Basmati</option>
                    <option value="Sona Masoori">Sona Masoori</option>
                    <option value="Brown Rice">Brown Rice</option>
                    <option value="Kolam">Kolam</option>
                    <option value="Jeera">Jeera</option>
                    <option value="Ponni">Ponni</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2">Price (₹)</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" placeholder="0" />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Stock</label>
                    <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" placeholder="0" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowModal(false)} className="btn-outline flex-1 py-3">Cancel</button>
                <button onClick={handleSave} className="btn-primary flex-1 py-3">
                  {editing ? 'Update' : 'Add'} Product
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
