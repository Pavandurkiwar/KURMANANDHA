import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineAdjustments, HiOutlineSearch, HiOutlineX, HiOutlineFilter } from 'react-icons/hi';
import ProductCard from '../components/product/ProductCard';

const allProducts = [
  { _id: '1', name: 'Premium Basmati Rice', slug: 'premium-basmati-rice', price: 189, oldPrice: 229, stock: 50, rating: 4.8, numReviews: 124, category: { name: 'Basmati' }, images: [{ url: 'https://images.pexels.com/photos/8287250/pexels-photo-8287250.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 18, origin: 'India', cookingTime: '15-20 min' },
  { _id: '2', name: 'Sona Masoori Rice', slug: 'sona-masoori-rice', price: 145, oldPrice: 165, stock: 50, rating: 4.6, numReviews: 98, category: { name: 'Sona Masoori' }, images: [{ url: 'https://images.pexels.com/photos/8287249/pexels-photo-8287249.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 12, origin: 'Andhra Pradesh', cookingTime: '12-15 min' },
  { _id: '3', name: 'Organic Brown Rice', slug: 'organic-brown-rice', price: 220, oldPrice: 260, stock: 50, rating: 4.7, numReviews: 76, category: { name: 'Brown Rice' }, images: [{ url: 'https://images.pexels.com/photos/3737691/pexels-photo-3737691.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 15, origin: 'Organic Farms', cookingTime: '20-25 min' },
  { _id: '4', name: 'Kolam Rice', slug: 'kolam-rice', price: 160, oldPrice: 185, stock: 50, rating: 4.5, numReviews: 52, category: { name: 'Kolam' }, images: [{ url: 'https://images.pexels.com/photos/3737694/pexels-photo-3737694.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 14, origin: 'Maharashtra', cookingTime: '12-15 min' },
  { _id: '5', name: 'Jeera Rice', slug: 'jeera-rice', price: 175, oldPrice: 200, stock: 50, rating: 4.4, numReviews: 41, category: { name: 'Jeera' }, images: [{ url: 'https://images.pexels.com/photos/3737695/pexels-photo-3737695.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 13, origin: 'Punjab', cookingTime: '15-18 min' },
  { _id: '6', name: 'Ponni Rice', slug: 'ponni-rice', price: 135, oldPrice: 155, stock: 50, rating: 4.3, numReviews: 63, category: { name: 'Ponni' }, images: [{ url: 'https://images.pexels.com/photos/3737697/pexels-photo-3737697.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 13, origin: 'Tamil Nadu', cookingTime: '12-15 min' },
  { _id: '7', name: 'Raw Rice', slug: 'raw-rice', price: 125, oldPrice: 140, stock: 50, rating: 4.2, numReviews: 35, category: { name: 'Raw Rice' }, images: [{ url: 'https://images.pexels.com/photos/8287247/pexels-photo-8287247.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 11, origin: 'Telangana', cookingTime: '15-20 min' },
  { _id: '8', name: 'Steam Rice', slug: 'steam-rice', price: 130, oldPrice: 150, stock: 50, rating: 4.1, numReviews: 28, category: { name: 'Steam Rice' }, images: [{ url: 'https://images.pexels.com/photos/3708747/pexels-photo-3708747.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 13, origin: 'Karnataka', cookingTime: '15-20 min' },
  { _id: '9', name: 'Broken Rice', slug: 'broken-rice', price: 95, oldPrice: 110, stock: 50, rating: 4.0, numReviews: 19, category: { name: 'Broken Rice' }, images: [{ url: 'https://images.pexels.com/photos/4198000/pexels-photo-4198000.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 14, origin: 'India', cookingTime: '10-12 min' },
  { _id: '10', name: 'Idly Rice', slug: 'idly-rice', price: 140, oldPrice: 160, stock: 50, rating: 4.4, numReviews: 45, category: { name: 'Idly Rice' }, images: [{ url: 'https://images.pexels.com/photos/3737698/pexels-photo-3737698.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 13, origin: 'Tamil Nadu', cookingTime: 'Soak overnight' },
  { _id: '11', name: 'Dubar Rice', slug: 'dubar-rice', price: 150, oldPrice: 170, stock: 50, rating: 4.3, numReviews: 31, category: { name: 'Dubar' }, images: [{ url: 'https://images.pexels.com/photos/8287243/pexels-photo-8287243.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 12, origin: 'Andhra Pradesh', cookingTime: '15-20 min' },
  { _id: '12', name: 'Ghee Rice', slug: 'ghee-rice', price: 195, oldPrice: 230, stock: 50, rating: 4.6, numReviews: 57, category: { name: 'Specialty' }, images: [{ url: 'https://images.pexels.com/photos/11196880/pexels-photo-11196880.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 15, origin: 'India', cookingTime: '20-25 min' },
];

const categories = ['All', 'Basmati', 'Sona Masoori', 'Brown Rice', 'Kolam', 'Jeera', 'Ponni', 'Raw Rice', 'Steam Rice', 'Broken Rice'];
const sortOptions = [
  { value: '-createdAt', label: 'Newest' },
  { value: '-rating', label: 'Best Rating' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-numReviews', label: 'Most Reviewed' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 300]);

  let filtered = [...allProducts];

  // Search
  if (searchQuery) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Category
  if (activeCategory !== 'All') {
    filtered = filtered.filter((p) => p.category.name === activeCategory);
  }

  // Price
  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy) {
      case '-rating': return b.rating - a.rating;
      case 'price': return a.price - b.price;
      case '-price': return b.price - a.price;
      case '-numReviews': return b.numReviews - a.numReviews;
      default: return b.createdAt ? 1 : -1;
    }
  });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Our Products</h1>
          <p className="text-dark-300 mt-2 text-lg">Discover our premium range of rice and grocery products</p>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-10" data-aos="fade-up">
          <div className="relative flex-1 max-w-md w-full">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-300" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <HiOutlineX className="w-4 h-4 text-dark-300" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="btn-outline flex items-center gap-2 px-4 py-2.5 text-sm">
              <HiOutlineFilter className="w-4 h-4" /> Filters
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field w-full md:w-48">
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 overflow-x-auto" data-aos="fade-up">
          <div className="flex gap-2 pb-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 text-dark-400 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filters Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-50 rounded-2xl p-6 mt-4 space-y-4">
                <div>
                  <label className="font-medium text-sm">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
                  <input
                    type="range"
                    min={50}
                    max={300}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full mt-2 accent-primary-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <p className="mt-6 text-dark-300 text-sm">{filtered.length} products found</p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl">🔍</span>
            <p className="text-xl font-semibold mt-4">No products found</p>
            <p className="text-dark-300 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filtered.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
