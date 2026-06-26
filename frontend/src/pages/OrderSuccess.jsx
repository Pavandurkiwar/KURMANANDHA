import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCheckCircle, HiOutlineShoppingBag, HiOutlineHome } from 'react-icons/hi';

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg mx-auto px-4"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <HiOutlineCheckCircle className="w-14 h-14 text-green-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mt-6">Order Placed! 🎉</h1>
        <p className="text-dark-300 mt-3 text-lg">Thank you for your order. We'll start processing it right away.</p>
        <div className="bg-gray-50 rounded-2xl p-6 mt-8">
          <p className="text-sm text-dark-300">Order Number</p>
          <p className="text-2xl font-bold text-primary-600 mt-1 font-mono">{id}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link to="/products" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3">
            <HiOutlineShoppingBag className="w-5 h-5" /> Continue Shopping
          </Link>
          <Link to="/" className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-3">
            <HiOutlineHome className="w-5 h-5" /> Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
