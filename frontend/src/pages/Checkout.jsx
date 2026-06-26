import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCreditCard, HiOutlineCash, HiOutlineDeviceMobile, HiOutlineCheck } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, discountAmount, taxAmount, shipping, total, clearCart, coupon } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
    phone: user?.phone || '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    // Mock order placement
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/order-success/ORD' + Date.now());
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold" data-aos="fade-up">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mt-8 mb-10" data-aos="fade-up">
          {[
            { num: 1, label: 'Shipping' },
            { num: 2, label: 'Payment' },
            { num: 3, label: 'Confirm' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-4 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s.num ? 'bg-primary-500 text-white' : 'bg-gray-200 text-dark-300'
              }`}>
                {step > s.num ? <HiOutlineCheck className="w-5 h-5" /> : s.num}
              </div>
              <span className={`font-medium hidden sm:block ${step >= s.num ? 'text-primary-500' : 'text-dark-300'}`}>{s.label}</span>
              {s.num < 3 && <div className={`flex-1 h-0.5 ${step > s.num ? 'bg-primary-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-display font-bold mb-6">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-medium mb-2">Street Address</label>
                    <input value={form.street} onChange={(e) => updateForm('street', e.target.value)} className="input-field" placeholder="123 Main Street" />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">City</label>
                    <input value={form.city} onChange={(e) => updateForm('city', e.target.value)} className="input-field" placeholder="City" />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">State</label>
                    <input value={form.state} onChange={(e) => updateForm('state', e.target.value)} className="input-field" placeholder="State" />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Pincode</label>
                    <input value={form.pincode} onChange={(e) => updateForm('pincode', e.target.value)} className="input-field" placeholder="500001" />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Phone</label>
                    <input value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} className="input-field" placeholder="9876543210" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-medium mb-2">Order Notes (Optional)</label>
                    <textarea value={form.notes} onChange={(e) => updateForm('notes', e.target.value)} className="input-field h-24" placeholder="Any special instructions..." />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-primary mt-6 px-10 py-3">Continue to Payment</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-display font-bold mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'COD', icon: HiOutlineCash, label: 'Cash on Delivery', desc: 'Pay when you receive' },
                    { value: 'UPI', icon: HiOutlineDeviceMobile, label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
                    { value: 'Card', icon: HiOutlineCreditCard, label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
                  ].map((method) => (
                    <button
                      key={method.value}
                      onClick={() => setPaymentMethod(method.value)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === method.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <method.icon className="w-6 h-6 text-primary-500" />
                      <div className="text-left">
                        <span className="font-semibold block">{method.label}</span>
                        <span className="text-sm text-dark-300">{method.desc}</span>
                      </div>
                      {paymentMethod === method.value && (
                        <HiOutlineCheck className="w-5 h-5 text-primary-500 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-outline px-8 py-3">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1 px-8 py-3">Review Order</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-display font-bold mb-6">Confirm Order</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold mb-2">Shipping to</h3>
                    <p className="text-dark-400">{form.street}, {form.city}, {form.state} - {form.pincode}</p>
                    <p className="text-dark-400">Phone: {form.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold mb-2">Payment via</h3>
                    <p className="text-dark-400">{paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod === 'UPI' ? 'UPI Payment' : 'Card Payment'}</p>
                  </div>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex items-center justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(2)} className="btn-outline px-8 py-3">Back</button>
                  <button onClick={handlePlaceOrder} className="btn-primary flex-1 px-8 py-3 text-lg">Place Order — ₹{total.toLocaleString()}</button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div data-aos="fade-left">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
              <h3 className="text-xl font-display font-bold mb-6">Order Summary</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <img src={item.images?.[0]?.url || ''} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-dark-300">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discountAmount.toLocaleString()}</span></div>}
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="flex justify-between"><span>GST (5%)</span><span>₹{taxAmount.toLocaleString()}</span></div>
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-primary-600">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
