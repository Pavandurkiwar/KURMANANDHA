import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';

const posts = [
  { title: 'Benefits of Basmati Rice', excerpt: 'Discover why basmati rice is considered the king of rice varieties. From its aromatic fragrance to its health benefits, learn everything about this premium grain.', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop', date: 'Mar 15, 2026', category: 'Health', author: 'Admin' },
  { title: 'Healthy Brown Rice Guide', excerpt: 'Learn about the nutritional benefits of switching to brown rice and how to incorporate it into your daily meals for a healthier lifestyle.', image: 'https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=600&h=400&fit=crop', date: 'Mar 10, 2026', category: 'Nutrition', author: 'Admin' },
  { title: 'Rice Storage Tips', excerpt: 'How to store rice properly to maintain freshness and prevent pests. Expert tips for keeping your rice grain-perfect for months.', image: 'https://images.unsplash.com/photo-1558211583-d65f7b7d9e4c?w=600&h=400&fit=crop', date: 'Mar 5, 2026', category: 'Tips', author: 'Admin' },
  { title: 'Organic Rice Benefits', excerpt: 'Why organic rice is better for your health and the environment. Understand the difference between organic and conventional rice farming.', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&h=400&fit=crop', date: 'Feb 28, 2026', category: 'Health', author: 'Admin' },
  { title: 'How to Cook Perfect Rice Every Time', excerpt: 'Master the art of cooking rice with our comprehensive guide. From water ratios to cooking times, get perfect rice every single time.', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop', date: 'Feb 20, 2026', category: 'Cooking', author: 'Admin' },
  { title: 'Traditional Rice Dishes of India', excerpt: 'Explore the rich culinary heritage of India through its diverse rice dishes — from biryanis to pongal, each region has its own specialty.', image: 'https://images.unsplash.com/photo-1558211583-d65f7b7d9e4c?w=600&h=400&fit=crop', date: 'Feb 15, 2026', category: 'Culture', author: 'Admin' },
];

const categories = ['All', 'Health', 'Nutrition', 'Tips', 'Cooking', 'Culture'];

export default function Blog() {
  return (
    <div className="pt-24 pb-16">
      <Helmet><title>Blog | Sri Kurmanandha</title></Helmet>
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white" data-aos="fade-up">Our Blog</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Tips, guides, and stories about rice, nutrition, and healthy living
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 bg-white/90 text-primary-600 px-3 py-1 rounded-full text-xs font-semibold">{post.category}</span>
                  <span className="absolute bottom-4 left-4 text-white text-sm">{post.date}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold group-hover:text-primary-500 transition-colors">{post.title}</h3>
                  <p className="text-dark-400 mt-3 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <span className="text-sm text-dark-300">By {post.author}</span>
                    <Link to="/blog" className="inline-flex items-center gap-1 text-primary-500 font-medium text-sm hover:gap-2 transition-all">
                      Read More <HiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
