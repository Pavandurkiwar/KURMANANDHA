import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineShoppingBag, HiArrowRight } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <Helmet><title>My Wishlist | Sri Kurmanandha</title></Helmet>
        <div className="text-center" data-aos="fade-up">
          <span className="text-8xl">💝</span>
          <h2 className="text-3xl font-display font-bold mt-6">Your Wishlist is Empty</h2>
          <p className="text-dark-300 mt-2">Save your favorite products here</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2 mt-8 px-10 py-4 text-lg">
            <HiArrowRight className="w-5 h-5" /> Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <Helmet><title>My Wishlist | Sri Kurmanandha</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold" data-aos="fade-up">My Wishlist</h1>
        <p className="text-dark-300 mt-1 mb-8" data-aos="fade-up">{wishlist.length} saved items</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-48 bg-gray-50">
                <img src={item.images?.[0]?.url || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button onClick={() => toggleWishlist(item)} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-lg hover:bg-red-50 transition-colors">
                  <HiOutlineHeart className="w-5 h-5 text-red-500 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <Link to={`/products/${item.slug || item._id}`} className="font-semibold hover:text-primary-500 transition-colors">{item.name}</Link>
                <p className="text-xl font-bold text-primary-600 mt-1">₹{item.price?.toLocaleString()}</p>
                <button onClick={() => addToCart(item, 1)} className="w-full mt-3 btn-primary flex items-center justify-center gap-2 py-2.5 text-sm">
                  <HiOutlineShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
