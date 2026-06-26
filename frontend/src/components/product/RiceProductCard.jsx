import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineEye, HiShoppingCart, HiCheck, HiStar } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';

export default function RiceProductCard({ variety, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart } = useCart();

  const details = variety.details || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl overflow-hidden
                 shadow-lg hover:shadow-2xl hover:shadow-primary-500/10
                 hover:-translate-y-2 transition-all duration-500 ease-out
                 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Loading skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
        )}

        {/* Rice Image with zoom effect */}
        <img
          src={variety.image}
          alt={variety.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out
                     group-hover:scale-110 group-hover:rotate-1
                     ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/95 backdrop-blur-sm text-primary-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            🌾 Premium
          </span>
          {variety.origin && (
            <span className="bg-primary-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
              📍 {variety.origin}
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Link
            to={`/products/${variety.slug}`}
            className="bg-white/95 backdrop-blur-sm text-dark-500 px-6 py-3 rounded-full font-semibold
                       shadow-xl hover:bg-primary-500 hover:text-white
                       transition-all duration-300 transform hover:scale-105
                       flex items-center gap-2"
          >
            <HiOutlineEye className="w-5 h-5" />
            Quick View
          </Link>
        </motion.div>

        {/* Decorative corner accent */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary-500/10 rounded-full blur-xl
                        group-hover:bg-primary-500/20 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Product Name */}
        <Link to={`/products/${variety.slug}`}>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-dark-500
                         group-hover:text-primary-600 transition-colors duration-300
                         line-clamp-1">
            {variety.name}
          </h3>
        </Link>

        {/* Rating */}
        {variety.rating && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <HiStar
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(variety.rating) ? 'text-gold-400 fill-current' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs text-dark-300">({variety.numReviews || 0})</span>
          </div>
        )}

        {/* Short Description */}
        {details.shortDescription && (
          <p className="text-dark-400 text-sm mt-2 leading-relaxed line-clamp-2">
            {details.shortDescription}
          </p>
        )}

        {/* Uses Tags */}
        {details.uses && details.uses.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-1.5">Best For</p>
            <div className="flex flex-wrap gap-1.5">
              {details.uses.slice(0, 3).map((use, i) => (
                <span
                  key={i}
                  className="text-xs bg-primary-50 text-primary-600 px-2.5 py-1 rounded-full font-medium
                             border border-primary-100"
                >
                  {use}
                </span>
              ))}
              {details.uses.length > 3 && (
                <span className="text-xs bg-gray-100 text-dark-300 px-2.5 py-1 rounded-full font-medium">
                  +{details.uses.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Benefits */}
        {details.benefits && details.benefits.length > 0 && (
          <div className="mt-3 space-y-1">
            {details.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-dark-400">
                <HiCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />
                <span className="line-clamp-1">{benefit}</span>
              </div>
            ))}
            {details.benefits.length > 2 && (
              <p className="text-xs text-primary-500 font-medium ml-5">+{details.benefits.length - 2} more benefits</p>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="my-4 border-t border-gray-100" />

        {/* View Details Button */}
        <Link
          to={`/products/${variety.slug}`}
          className="w-full inline-flex items-center justify-center gap-2
                     bg-gradient-to-r from-primary-500 to-primary-600
                     text-white font-semibold py-3 px-6 rounded-xl
                     hover:from-primary-600 hover:to-primary-700
                     hover:shadow-lg hover:shadow-primary-500/30
                     active:scale-[0.98]
                     transition-all duration-300 group/btn"
        >
          <span>View Details</span>
          <HiOutlineEye className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>

        {/* Add to Cart small */}
        <button
          onClick={() => addToCart({ _id: variety.slug, name: variety.name, price: details.price || 0, images: [{ url: variety.image }], slug: variety.slug }, 1)}
          className="mt-2 w-full flex items-center justify-center gap-2
                     text-primary-600 font-medium py-2.5 px-6 rounded-xl
                     border-2 border-primary-200 bg-primary-50/50
                     hover:bg-primary-500 hover:text-white hover:border-primary-500
                     active:scale-[0.98]
                     transition-all duration-300 text-sm"
        >
          <HiShoppingCart className="w-4 h-4" />
          {details.price ? `Add to Cart - ₹${details.price}/kg` : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
}
