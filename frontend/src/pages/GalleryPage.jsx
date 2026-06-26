import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { HiOutlineX, HiOutlineZoomIn } from 'react-icons/hi';

const categories = ['All', 'Rice Products', 'Store', 'Warehouse', 'Customers', 'Farming'];

const galleryItems = [
  { id: 1, src: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=500&fit=crop', category: 'Rice Products', title: 'Premium Basmati' },
  { id: 2, src: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=600&h=800&fit=crop', category: 'Farming', title: 'Rice Fields' },
  { id: 3, src: 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=600&h=400&fit=crop', category: 'Rice Products', title: 'Sona Masoori' },
  { id: 4, src: 'https://images.unsplash.com/photo-1528505086635-4c5d7f3b1d4a?w=600&h=600&fit=crop', category: 'Farming', title: 'Harvest Season' },
  { id: 5, src: 'https://images.unsplash.com/photo-1558211583-d65f7b7d9e4c?w=600&h=700&fit=crop', category: 'Store', title: 'Our Store' },
  { id: 6, src: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&h=450&fit=crop', category: 'Rice Products', title: 'Organic Rice' },
  { id: 7, src: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=600&h=550&fit=crop', category: 'Customers', title: 'Happy Customer' },
  { id: 8, src: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=650&fit=crop', category: 'Warehouse', title: 'Storage Facility' },
  { id: 9, src: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&h=500&fit=crop', category: 'Warehouse', title: 'Quality Check' },
  { id: 10, src: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=600&h=750&fit=crop', category: 'Farming', title: 'Planting Season' },
  { id: 11, src: 'https://images.unsplash.com/photo-1558211583-d65f7b7d9e4c?w=600&h=400&fit=crop', category: 'Store', title: 'Product Display' },
  { id: 12, src: 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=600&h=600&fit=crop', category: 'Customers', title: 'Customer Feedback' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-24 pb-16">
      <Helmet>
        <title>Gallery | Sri Kurmanandha</title>
        <meta name="description" content="Browse through our gallery showcasing premium rice products, our store, farming heritage, and happy customers." />
      </Helmet>
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white" data-aos="fade-up">Our Gallery</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            A visual journey through our products, store, and rice farming heritage
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 text-dark-400 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                  onClick={() => setLightbox(item)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <HiOutlineZoomIn className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-white/70">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            >
              <HiOutlineX className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.title} className="w-full h-full object-contain rounded-2xl" />
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-semibold">{lightbox.title}</h3>
                <p className="text-white/60">{lightbox.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
