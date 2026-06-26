import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [form, setForm] = useState({ password: '', confirmPassword: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password reset successfully! You can now login.');
  };

  if (!token) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
        <Helmet><title>Reset Password | Sri Kurmanandha</title></Helmet>
        <div className="text-center">
          <span className="text-6xl">⚠️</span>
          <h2 className="text-2xl font-display font-bold mt-4">Invalid or Expired Link</h2>
          <p className="text-dark-300 mt-2">Please request a new password reset link.</p>
          <Link to="/forgot-password" className="btn-primary inline-block mt-6 px-8 py-3">Request New Link</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <Helmet><title>Reset Password | Sri Kurmanandha</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <span className="text-5xl">🔑</span>
            <h1 className="text-3xl font-display font-bold mt-4">Reset Password</h1>
            <p className="text-dark-300 mt-2">Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium mb-2">New Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field" placeholder="Min 6 characters" required />
            </div>
            <div>
              <label className="block font-medium mb-2">Confirm Password</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="input-field" placeholder="Confirm password" required />
            </div>
            <button type="submit" className="btn-primary w-full py-3.5 text-lg">Reset Password</button>
            <p className="text-center text-dark-300 text-sm">
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">Back to Login</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
