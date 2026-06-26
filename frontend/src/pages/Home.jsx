import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { HiArrowRight, HiCheck, HiShieldCheck, HiTruck, HiStar, HiSparkles } from 'react-icons/hi';
import { FaLeaf, FaAward, FaTag, FaBox } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/product/ProductCard';
import CountUp from '../components/ui/CountUp';

const products = [
  {
    _id: '1', name: 'Premium Basmati Rice', slug: 'premium-basmati-rice',
    price: 189, oldPrice: 229, stock: 50, rating: 4.8, numReviews: 124,
    images: [{ url: 'https://images.pexels.com/photos/8287250/pexels-photo-8287250.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }],
    category: { name: 'Premium Rice' }, discount: 18,
  },
  {
    _id: '2', name: 'Sona Masoori Rice', slug: 'sona-masoori-rice',
    price: 145, oldPrice: 165, stock: 50, rating: 4.6, numReviews: 98,
    images: [{ url: 'https://images.pexels.com/photos/8287249/pexels-photo-8287249.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }],
    category: { name: 'Premium Rice' }, discount: 12,
  },
  {
    _id: '3', name: 'Organic Brown Rice', slug: 'organic-brown-rice',
    price: 220, oldPrice: 260, stock: 50, rating: 4.7, numReviews: 76,
    images: [{ url: 'https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }],
    category: { name: 'Organic' }, discount: 15,
  },
  {
    _id: '4', name: 'Kolam Rice', slug: 'kolam-rice',
    price: 160, oldPrice: 185, stock: 50, rating: 4.5, numReviews: 52,
    images: [{ url: 'https://images.pexels.com/photos/3737694/pexels-photo-3737694.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }],
    category: { name: 'Premium Rice' }, discount: 14,
  },
  {
    _id: '5', name: 'Jeera Rice', slug: 'jeera-rice',
    price: 175, oldPrice: 200, stock: 50, rating: 4.4, numReviews: 41,
    images: [{ url: 'https://images.pexels.com/photos/3737695/pexels-photo-3737695.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }],
    category: { name: 'Premium Rice' }, discount: 13,
  },
  {
    _id: '6', name: 'Ponni Rice', slug: 'ponni-rice',
    price: 135, oldPrice: 155, stock: 50, rating: 4.3, numReviews: 63,
    images: [{ url: 'https://images.pexels.com/photos/3737697/pexels-photo-3737697.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop' }],
    category: { name: 'Regular Rice' }, discount: 13,
  },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Home Chef', rating: 5, text: 'Best rice quality in our city. The Basmati rice aroma is incredible!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Rahul Verma', role: 'Restaurant Owner', rating: 5, text: 'We have been sourcing from Sri Kurmanandha for years. Consistent quality and timely delivery.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { name: 'Anita Patel', role: 'Regular Customer', rating: 5, text: 'The organic brown rice changed my family\'s eating habits. Highly recommend!', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { name: 'Vikram Singh', role: 'Fitness Enthusiast', rating: 5, text: 'Great variety of rice and grocery items. The prices are very reasonable.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { name: 'Lakshmi Devi', role: 'Home Maker', rating: 5, text: 'Pure, fresh, and authentic. Just like the rice we used to get back in our village.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
];

const blogPosts = [
  { title: 'Benefits of Basmati Rice', excerpt: 'Discover why basmati rice is considered the king of rice varieties...', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', date: 'Mar 15, 2026' },
  { title: 'Healthy Brown Rice Guide', excerpt: 'Learn about the nutritional benefits of switching to brown rice...', image: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=400&h=300&fit=crop', date: 'Mar 10, 2026' },
  { title: 'Rice Storage Tips', excerpt: 'How to store rice properly to maintain freshness and prevent pests...', image: 'https://images.unsplash.com/photo-1558211583-d65f7b7d9e4c?w=400&h=300&fit=crop', date: 'Mar 5, 2026' },
  { title: 'Organic Rice Benefits', excerpt: 'Why organic rice is better for your health and the environment...', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=300&fit=crop', date: 'Feb 28, 2026' },
];

export default function Home() {
  const heroRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Sri Kurmanandha | Premium Rice & General Stores</title>
        <meta name="description" content="Premium quality rice and grocery products. Pure Rice, Pure Tradition - serving generations." />
      </Helmet>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=1920&q=80"
            alt="Rice Field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-600/90 via-dark-600/70 to-transparent" />
        </div>

        {/* Animated Rice Grains */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {dimensions.width > 0 && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-4 bg-white/10 rounded-full"
              initial={{
                x: Math.random() * dimensions.width,
                y: -20,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: dimensions.height + 20,
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <HiSparkles className="w-4 h-4 text-gold-400" />
                Premium Quality Since 2000
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                Pure Rice,{' '}
                <span className="text-gradient-gold">Pure Tradition</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-2xl leading-relaxed">
                Providing premium quality rice and grocery products for generations. 
                From our fields to your table — experience the taste of tradition.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Link to="/products" className="btn-gold inline-flex items-center gap-2 text-lg px-10 py-4">
                  Shop Now <HiArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/rice-varieties" className="btn-outline-light inline-flex items-center gap-2 text-lg px-10 py-4">
                  Explore Varieties
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Floating Rice Bag */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:block absolute right-12 bottom-12 w-72 h-72"
          >
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 backdrop-blur-sm border border-white/10 p-6">
              <div className="text-center">
                <span className="text-8xl">🌾</span>
                <p className="text-white font-display font-bold text-xl mt-4">Premium Quality</p>
                <p className="text-gold-400 text-sm">100% Natural</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-24 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Why Choose Sri Kurmanandha?</h2>
          <p className="section-subtitle">Experience the difference of premium quality and dedicated service</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {[
              { icon: HiTruck, title: 'Free Delivery', desc: 'On orders above ₹500', color: 'from-blue-500 to-blue-600' },
              { icon: FaLeaf, title: '100% Natural', desc: 'Pure & unpolished rice', color: 'from-green-500 to-green-600' },
              { icon: HiStar, title: 'Premium Quality', desc: 'Finest grains selected', color: 'from-gold-400 to-gold-500' },
              { icon: HiShieldCheck, title: 'Quality Guaranteed', desc: 'Satisfaction assured', color: 'from-purple-500 to-purple-600' },
              { icon: FaTag, title: 'Best Price', desc: 'Competitive pricing', color: 'from-red-500 to-red-600' },
              { icon: FaBox, title: 'Fresh Packaging', desc: 'Hygienic & sealed', color: 'from-teal-500 to-teal-600' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-gray-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="mt-4 font-bold text-dark-500">{feature.title}</h3>
                <p className="text-xs text-dark-300 mt-1">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-24 bg-gray-50" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Premium Products</h2>
          <p className="section-subtitle">Handpicked selection of finest quality rice and groceries</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {products.slice(0, 8).map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4">
              View All Products <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT / STATS SECTION ===== */}
      <section className="relative py-24 overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1528505086635-4c5d7f3b1d4a?w=1920&q=80" alt="Rice farming" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/95 to-primary-600/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold-400 font-semibold tracking-wider uppercase text-sm">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4">
                Generations of Trust,<br />Grains of Perfection
              </h2>
              <p className="text-gray-300 mt-6 leading-relaxed text-lg">
                For over two decades, Sri Kurmanandha Rice & General Stores has been synonymous with quality. 
                We source our rice directly from the finest farms, ensuring every grain meets our stringent 
                quality standards. Our commitment to purity and customer satisfaction has made us a trusted 
                name in the community.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-10">
                {[
                  { label: 'Years Experience', value: '20+' },
                  { label: 'Rice Varieties', value: '50+' },
                  { label: 'Happy Customers', value: '5000+' },
                  { label: 'Satisfaction', value: '100%' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                    <CountUp end={parseInt(stat.value)} suffix={stat.value.includes('+') ? '+' : '%'} />
                    <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=400&h=500&fit=crop" alt="Rice field" className="w-full h-64 object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1528505086635-4c5d7f3b1d4a?w=400&h=300&fit=crop" alt="Harvest" className="w-full h-40 object-cover" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop" alt="Rice grains" className="w-full h-40 object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1558211583-d65f7b7d9e4c?w=400&h=400&fit=crop" alt="Store" className="w-full h-64 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Hear from our satisfied customers about their experience</p>
          <div className="mt-12">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} className="w-5 h-5 text-gold-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-dark-400 leading-relaxed mb-6">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-semibold">{t.name}</h4>
                        <p className="text-sm text-dark-300">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ===== BLOG SECTION ===== */}
      <section className="py-24 bg-gray-50" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">From Our Blog</h2>
          <p className="section-subtitle">Tips, guides, and insights about rice and healthy living</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group premium-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs text-white/80 bg-black/40 px-2 py-1 rounded">{post.date}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg group-hover:text-primary-500 transition-colors">{post.title}</h3>
                  <p className="text-dark-300 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  <Link to="/blog" className="inline-flex items-center gap-1 text-primary-500 font-medium text-sm mt-3 hover:gap-2 transition-all">
                    Read More <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Ready to Experience Pure Quality?
            </h2>
            <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
              Browse our collection of premium rice and grocery products. 
              We deliver freshness right to your doorstep.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link to="/products" className="bg-white text-primary-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-white/20 transition-all hover:-translate-y-1">
                Order Now
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-600 transition-all">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
