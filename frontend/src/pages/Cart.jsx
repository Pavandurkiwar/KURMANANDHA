import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineMinus, HiOutlinePlus, HiOutlineTrash, HiOutlineShoppingBag, HiOutlineTag } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cartItems, removeFromCart, updateQuantity, clearCart,
    subtotal, discountAmount, taxAmount, shipping, total,
    coupon, applyCoupon, removeCoupon,
  } = useCart();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput.toUpperCase())) {
      setCouponInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center" data-aos="fade-up">
          <span className="text-8xl">🛒</span>
          <h2 className="text-3xl font-display font-bold mt-6">Your Cart is Empty</h2>
          <p className="text-dark-300 mt-2">Looks like you haven't added anything yet</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2 mt-8 px-10 py-4 text-lg">
            <HiOutlineShoppingBag className="w-5 h-5" /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between" data-aos="fade-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Shopping Cart</h1>
            <p className="text-dark-300 mt-1">{cartItems.length} items in your cart</p>
          </div>
          <button onClick={clearCart} className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center gap-1">
            <HiOutlineTrash className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4" data-aos="fade-right">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.images?.[0]?.url || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/products/${item.slug || item._id}`} className="font-semibold hover:text-primary-500 transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-sm text-dark-300 mt-0.5">Unit: ₹{item.price.toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                        <HiOutlineX className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-gray-100 rounded-lg">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors">
                          <HiOutlineMinus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors">
                          <HiOutlinePlus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xl font-bold text-primary-600">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div data-aos="fade-left">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
              <h3 className="text-xl font-display font-bold mb-6">Order Summary</h3>

              {/* Coupon */}
              <div className="mb-6">
                {coupon ? (
                  <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3">
                    <div>
                      <span className="font-semibold text-green-700">{coupon.code}</span>
                      <span className="text-green-600 text-sm ml-2">({coupon.discount}% OFF)</span>
                    </div>
                    <button onClick={removeCoupon} className="text-red-500 hover:text-red-600"><HiOutlineX className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="input-field flex-1 text-sm"
                    />
                    <button onClick={handleApplyCoupon} className="btn-primary px-4 py-2 text-sm whitespace-nowrap">Apply</button>
                  </div>
                )}
              </div>

              <div className="space-y-3 border-b border-gray-100 pb-4">
                <div className="flex justify-between text-dark-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({coupon?.discount}%)</span>
                    <span className="font-semibold">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-dark-400">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-dark-400">
                  <span>GST (5%)</span>
                  <span className="font-semibold">₹{taxAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 text-lg">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-primary-600">₹{total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center block mt-6 py-4 text-lg">
                Proceed to Checkout
              </Link>

              <Link to="/products" className="block text-center text-sm text-primary-500 hover:text-primary-600 font-medium mt-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
