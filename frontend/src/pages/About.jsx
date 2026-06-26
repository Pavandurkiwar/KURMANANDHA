import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { HiOutlineShieldCheck, HiOutlineEye } from 'react-icons/hi';
import CountUp from '../components/ui/CountUp';

export default function About() {
  return (
    <div className="pt-24 pb-16">
      <Helmet>
        <title>About Us | Sri Kurmanandha</title>
        <meta name="description" content="Learn about Sri Kurmanandha Rice & General Stores - our story, mission, values, and commitment to quality since 2000." />
      </Helmet>
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white" data-aos="fade-up">About Us</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Discover the story behind Sri Kurmanandha Rice & General Stores
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center" data-aos="fade-up">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=500&fit=crop" alt="Store" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl mt-8">
                <img src="https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=400&h=300&fit=crop" alt="Rice field" className="w-full h-48 object-cover" />
              </div>
            </div>
            <div>
              <span className="text-gold-500 font-semibold tracking-wider uppercase text-sm">Our Story</span>
              <h2 className="text-4xl font-display font-bold mt-4">Generations of Trust, Grains of Perfection</h2>
              <p className="text-dark-400 mt-6 leading-relaxed">
                Founded in the year 2000, Sri Kurmanandha Rice & General Stores began as a small family-run business 
                with a simple mission — to provide the finest quality rice to our community. Over two decades later, 
                we have grown into a trusted name synonymous with quality, purity, and customer satisfaction.
              </p>
              <p className="text-dark-400 mt-4 leading-relaxed">
                We source our rice directly from the finest farms across India, ensuring that every grain meets 
                our stringent quality standards. From the aromatic basmati of Punjab to the nutritious brown rice 
                of organic farms, our diverse range caters to every palate and preference.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: HiOutlineShieldCheck, title: 'Our Mission', desc: 'To provide premium quality rice and groceries at affordable prices with exceptional service.' },
                  { icon: HiOutlineEye, title: 'Our Vision', desc: 'To be the most trusted grocery brand, known for quality, purity, and customer satisfaction.' },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-50 rounded-xl p-5">
                    <item.icon className="w-8 h-8 text-primary-500 mb-3" />
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-dark-300 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { end: 20, suffix: '+', label: 'Years Experience' },
              { end: 5000, suffix: '+', label: 'Happy Customers' },
              { end: 50, suffix: '+', label: 'Rice Varieties' },
              { end: 100, suffix: '%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center text-white" data-aos="fade-up">
                <CountUp end={stat.end} suffix={stat.suffix} />
                <p className="text-white/70 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title" data-aos="fade-up">Our Core Values</h2>
          <p className="section-subtitle" data-aos="fade-up">The principles that guide everything we do</p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: 'Quality First', desc: 'We never compromise on quality. Every product is carefully selected and tested.', icon: '🌟' },
              { title: 'Customer Trust', desc: 'Our customers are family. We build lasting relationships through honesty and reliability.', icon: '🤝' },
              { title: 'Pure & Natural', desc: 'We believe in the power of nature. Our products are 100% natural and pure.', icon: '🌿' },
              { title: 'Community Focus', desc: 'Supporting local farmers and contributing to our community\'s well-being.', icon: '🏘️' },
              { title: 'Innovation', desc: 'Continuously improving our products and services to serve you better.', icon: '💡' },
              { title: 'Sustainability', desc: 'Committed to sustainable farming practices and eco-friendly packaging.', icon: '♻️' },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <span className="text-4xl">{value.icon}</span>
                <h3 className="text-xl font-display font-bold mt-4">{value.title}</h3>
                <p className="text-dark-400 mt-2">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
