import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineShoppingBag, HiOutlineEye, HiStar } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const image = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop';
  const discount = product.discount || (product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="premium-card group relative"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
          -{discount}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-full shadow-lg transition-all duration-300 ${
          isInWishlist(product._id)
            ? 'bg-red-500 text-white scale-110'
            : 'bg-white/90 text-dark-400 hover:bg-red-50 hover:text-red-500'
        }`}
      >
        <HiOutlineHeart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
      </button>

      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quick View Overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3"
        >
          <Link
            to={`/products/${product.slug || product._id}`}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110"
          >
            <HiOutlineEye className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Add to Cart Bar */}
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: isHovered ? 0 : 60 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 pt-8"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-2 py-1.5 text-white hover:bg-white/20 rounded-l transition-colors"
              >
                −
              </button>
              <span className="px-3 py-1.5 text-white font-semibold text-sm">{qty}</span>
              <button
                onClick={() => setQty(Math.min(qty + 1, product.stock || 99))}
                className="px-2 py-1.5 text-white hover:bg-white/20 rounded-r transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(product, qty)}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-600 transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              <HiOutlineShoppingBag className="w-4 h-4" />
              Add
            </button>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        {product.category?.name && (
          <span className="text-xs font-medium text-primary-500 bg-primary-50 px-2 py-1 rounded-full">
            {product.category.name}
          </span>
        )}

        {/* Name */}
        <Link to={`/products/${product.slug || product._id}`}>
          <h3 className="mt-2 font-display font-bold text-lg hover:text-primary-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <HiStar
              key={i}
              className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? 'text-gold-400 fill-current' : 'text-gray-200'}`}
            />
          ))}
          <span className="text-xs text-dark-300 ml-1">({product.numReviews || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-2xl font-bold text-primary-600">₹{product.price?.toLocaleString()}</span>
          {product.oldPrice > product.price && (
            <span className="text-sm text-dark-300 line-through">₹{product.oldPrice?.toLocaleString()}</span>
          )}
        </div>

        {/* Stock */}
        <div className="mt-2">
          {product.stock > 0 ? (
            <span className="text-xs text-green-600 font-medium">✓ In Stock</span>
          ) : (
            <span className="text-xs text-red-500 font-medium">✕ Out of Stock</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
