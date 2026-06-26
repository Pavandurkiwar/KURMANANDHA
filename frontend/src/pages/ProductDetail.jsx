import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { HiStar, HiOutlineHeart, HiOutlineShare, HiOutlineMinus, HiOutlinePlus, HiShoppingCart, HiCheck, HiShieldCheck, HiTruck, HiRefresh } from 'react-icons/hi';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/product/ProductCard';

const product = {
  _id: '1', name: 'Premium Basmati Rice', slug: 'premium-basmati-rice',
  price: 189, oldPrice: 229, stock: 50, rating: 4.8, numReviews: 124,
  discount: 18, unit: 'kg', origin: 'Punjab', aroma: 'Sweet, nutty fragrance',
  cookingTime: '15-20 minutes', bestUsage: 'Biryanis, Pulao, Special occasions',
  grainType: 'Long Grain',
  description: 'Experience the royal taste of our Premium Basmati Rice. Sourced from the finest farms in Punjab, each grain is long, slender, and aromatic. Perfect for biryanis, pulaos, and special occasions that demand the best.',
  benefits: [
    'Rich in essential nutrients and vitamins',
    'Low glycemic index for better health',
    'Naturally gluten-free',
    'Aromatic fragrance enhances any dish',
    'Long grains remain separate after cooking',
  ],
  uses: ['Biryanis', 'Pulao', 'Special Occasions', 'Festive Meals', 'Gift Hampers'],
  storageInstructions: 'Store in an airtight container in a cool, dry place away from direct sunlight. Shelf life: 12 months.',
  packagingSizes: ['500g - ₹99', '1kg - ₹189', '2kg - ₹359', '5kg - ₹849', '10kg - ₹1,599'],
  cookingInstructions: [
    'Wash rice 2-3 times until water runs clear',
    'Soak for 20-30 minutes for best results',
    'Use 1:1.5 ratio of rice to water',
    'Cook on medium heat for 15-20 minutes',
    'Let it rest for 5 minutes before serving',
  ],
  nutritionalValues: {
    calories: '345 kcal', protein: '7.5g',
    carbs: '78g', fat: '0.6g', fiber: '1.2g',
  },
  images: [
    { url: 'https://images.pexels.com/photos/8287250/pexels-photo-8287250.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1600&fit=crop', alt: 'Premium Basmati Rice Bag' },
    { url: 'https://images.pexels.com/photos/8287249/pexels-photo-8287249.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1600&fit=crop', alt: 'Rice Packaging Bags' },
    { url: 'https://images.pexels.com/photos/3708747/pexels-photo-3708747.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1600&fit=crop', alt: 'Packaged Rice Products' },
    { url: 'https://images.pexels.com/photos/3737694/pexels-photo-3737694.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1600&fit=crop', alt: 'Premium Rice Bag' },
  ],
  category: { name: 'Premium Rice' },
  reviews: [
    { name: 'Priya Sharma', rating: 5, comment: 'Absolutely love this rice! The aroma fills the house.', date: '2026-02-15' },
    { name: 'Rajesh Kumar', rating: 5, comment: 'Best basmati rice in the market. Worth every penny.', date: '2026-02-10' },
    { name: 'Ananya Reddy', rating: 4, comment: 'Great quality, very aromatic. Will buy again.', date: '2026-01-28' },
    { name: 'Vikram Patel', rating: 5, comment: 'Perfect for biryani. Grains are long and separate.', date: '2026-01-20' },
  ],
};

const relatedProducts = [
  { _id: '2', name: 'Sona Masoori Rice', slug: 'sona-masoori-rice', price: 145, oldPrice: 165, stock: 50, rating: 4.6, numReviews: 98, category: { name: 'Premium Rice' }, images: [{ url: 'https://images.pexels.com/photos/8287249/pexels-photo-8287249.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 12 },
  { _id: '3', name: 'Organic Brown Rice', slug: 'organic-brown-rice', price: 220, oldPrice: 260, stock: 50, rating: 4.7, numReviews: 76, category: { name: 'Organic' }, images: [{ url: 'https://images.pexels.com/photos/3737691/pexels-photo-3737691.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 15 },
  { _id: '4', name: 'Kolam Rice', slug: 'kolam-rice', price: 160, oldPrice: 185, stock: 50, rating: 4.5, numReviews: 52, category: { name: 'Premium Rice' }, images: [{ url: 'https://images.pexels.com/photos/3737694/pexels-photo-3737694.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }], discount: 14 },
];

const faqs = [
  { q: 'How should I store this rice?', a: 'Store in an airtight container in a cool, dry place away from direct sunlight.' },
  { q: 'Is this rice gluten-free?', a: 'Yes, all our rice varieties are naturally gluten-free.' },
  { q: 'What is the shelf life?', a: 'Our rice has a shelf life of 12 months when stored properly.' },
  { q: 'Do I need to wash before cooking?', a: 'Yes, we recommend washing 2-3 times before cooking for best results.' },
  { q: 'Is this rice suitable for daily use?', a: 'Yes, our Premium Basmati Rice is excellent for daily consumption.' },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const p = product;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-300 mb-8" data-aos="fade-up">
          <Link to="/" className="hover:text-primary-500">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-500">Products</Link>
          <span>/</span>
          <span className="text-dark-500 font-medium">{p.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div data-aos="fade-right">
            <div
              className="relative rounded-2xl overflow-hidden bg-gray-50 cursor-crosshair mb-4"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
              style={{ height: '500px' }}
            >
              <img
                src={p.images[selectedImage]?.url}
                alt={p.images[selectedImage]?.alt}
                className="w-full h-full object-cover"
                style={zoom ? { transform: 'scale(2)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />
              {p.discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1.5 rounded-lg font-bold shadow-lg text-lg">
                  -{p.discount}% OFF
                </span>
              )}
            </div>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode
              watchSlidesProgress
              navigation
              modules={[Navigation, Thumbs]}
              className="thumbs-gallery"
            >
              {p.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <button
                    onClick={() => setSelectedImage(i)}
                    className={`w-full h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-primary-500 shadow-md' : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div data-aos="fade-left">
            <span className="badge-primary">{p.category.name}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mt-3">{p.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className={`w-5 h-5 ${i < Math.round(p.rating) ? 'text-gold-400 fill-current' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="font-semibold">{p.rating}</span>
              <span className="text-dark-300">({p.numReviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mt-6">
              <span className="text-4xl font-bold text-primary-600">₹{p.price.toLocaleString()}</span>
              <span className="text-xl text-dark-300 line-through">₹{p.oldPrice.toLocaleString()}</span>
              <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-lg">Save ₹{(p.oldPrice - p.price).toLocaleString()}</span>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 p-6 bg-gray-50 rounded-2xl">
              {[
                { label: 'Origin', value: p.origin },
                { label: 'Grain Type', value: p.grainType },
                { label: 'Aroma', value: p.aroma },
                { label: 'Cooking Time', value: p.cookingTime },
                { label: 'Best For', value: p.bestUsage },
              ].map((info) => (
                <div key={info.label}>
                  <p className="text-xs text-dark-300 uppercase tracking-wide">{info.label}</p>
                  <p className="font-semibold mt-1">{info.value}</p>
                </div>
              ))}
            </div>

            {/* Uses Tags */}
            {p.uses && p.uses.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-dark-500 mb-3">Popular Uses</p>
                <div className="flex flex-wrap gap-2">
                  {p.uses.map((use, i) => (
                    <span
                      key={i}
                      className="bg-primary-50 text-primary-600 px-3 py-1.5 rounded-lg text-sm font-medium
                                 border border-primary-100 hover:bg-primary-100 hover:shadow-sm
                                 transition-all duration-200 cursor-default"
                    >
                      🍽️ {use}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mt-6">
              {p.stock > 0 ? (
                <span className="flex items-center gap-2 text-green-600 font-medium"><HiCheck className="w-5 h-5" /> In Stock ({p.stock} available)</span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center bg-gray-100 rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-gray-200 rounded-l-xl transition-colors">
                  <HiOutlineMinus className="w-5 h-5" />
                </button>
                <span className="px-6 font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(Math.min(qty + 1, p.stock))} className="p-3 hover:bg-gray-200 rounded-r-xl transition-colors">
                  <HiOutlinePlus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => addToCart(p, qty)}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-4 text-lg"
              >
                <HiShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => toggleWishlist(p)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium border-2 transition-all ${
                  isInWishlist(p._id)
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <HiOutlineHeart className={`w-5 h-5 ${isInWishlist(p._id) ? 'fill-current' : ''}`} /> Wishlist
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium border-2 border-gray-200 hover:border-gray-300 transition-all">
                <HiOutlineShare className="w-5 h-5" /> Share
              </button>
            </div>

            {/* Share Icons */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
              <span className="text-sm text-dark-300">Share:</span>
              {[FaWhatsapp, FaFacebook, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 hover:text-primary-500 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { icon: HiTruck, text: 'Free delivery on orders above ₹500' },
                { icon: HiRefresh, text: 'Easy returns within 7 days' },
                { icon: HiShieldCheck, text: '100% quality guaranteed' },
                { icon: HiCheck, text: 'Fresh & hygienic packaging' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-dark-400">
                  <f.icon className="w-4 h-4 text-primary-500 shrink-0" />
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20" data-aos="fade-up">
          <div className="flex gap-0 border-b border-gray-200 overflow-x-auto">
            {['description', 'benefits', 'nutrition', 'packaging', 'storage', 'instructions', 'reviews', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-dark-300 hover:text-dark-500'
                }`}
              >
                {tab === 'faq' ? 'FAQ' : tab}
              </button>
            ))}
          </div>

          <div className="p-8 bg-gray-50 rounded-b-2xl">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-dark-400 leading-relaxed text-lg">{p.description}</p>
              </motion.div>
            )}

            {activeTab === 'benefits' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ul className="space-y-3">
                  {p.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <HiCheck className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-dark-400">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === 'nutrition' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(p.nutritionalValues).map(([key, val]) => (
                    <div key={key} className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <p className="text-2xl font-bold text-primary-500">{val}</p>
                      <p className="text-sm text-dark-300 capitalize mt-1">{key}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'packaging' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-lg font-semibold mb-4">Available Packaging Sizes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {p.packagingSizes?.map((size, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 group">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary-100 transition-colors">
                        <span className="text-xl">📦</span>
                      </div>
                      <p className="font-semibold text-dark-500 text-sm">{size}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'storage' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                      <span className="text-2xl">❄️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Storage Instructions</h3>
                      <p className="text-dark-400 leading-relaxed">{p.storageInstructions}</p>
                      <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm font-medium text-blue-700 mb-2">💡 Storage Tips</p>
                        <ul className="space-y-1.5 text-sm text-blue-600">
                          <li className="flex items-center gap-2">• Use airtight containers to keep rice fresh</li>
                          <li className="flex items-center gap-2">• Store away from strong-smelling foods</li>
                          <li className="flex items-center gap-2">• Keep in a cool, dark cupboard</li>
                          <li className="flex items-center gap-2">• Check for moisture before storing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'instructions' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ol className="space-y-3">
                  {p.cookingInstructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-sm">{i + 1}</span>
                      <span className="text-dark-400 pt-1.5">{inst}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="space-y-4">
                  {p.reviews.map((review, i) => (
                    <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-xs text-dark-300">{review.date}</span>
                      </div>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <HiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gold-400 fill-current' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <p className="text-dark-400 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'faq' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <details key={i} className="bg-white rounded-xl shadow-sm group">
                      <summary className="px-6 py-4 font-semibold cursor-pointer flex items-center justify-between group-open:border-b border-gray-100">
                        {faq.q}
                        <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="px-6 py-4 text-dark-400">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20" data-aos="fade-up">
          <h2 className="text-3xl font-display font-bold">Related Products</h2>
          <p className="text-dark-300 mt-2">You might also like these products</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {relatedProducts.map((rp, i) => (
              <ProductCard key={rp._id} product={rp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
