import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email'); return; }
    setSent(true);
    toast.success('Reset link sent to your email!');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <Helmet><title>Forgot Password | Sri Kurmanandha</title></Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <span className="text-5xl">🔐</span>
            <h1 className="text-3xl font-display font-bold mt-4">Forgot Password?</h1>
            <p className="text-dark-300 mt-2">Enter your email and we'll send you a reset link</p>
          </div>

          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✉️</span>
              </div>
              <p className="text-lg font-semibold mt-4">Check Your Email</p>
              <p className="text-dark-300 mt-2">We've sent a password reset link to <strong>{email}</strong></p>
              <Link to="/login" className="btn-primary inline-block mt-6 px-8 py-3">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-medium mb-2">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="your@email.com" required />
              </div>
              <button type="submit" className="btn-primary w-full py-3.5 text-lg">Send Reset Link</button>
              <p className="text-center text-dark-300 text-sm">
                Remember your password? <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">Sign In</Link>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
