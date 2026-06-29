import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark-600 text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-bold">Stay Updated</h3>
              <p className="text-dark-100 mt-1">Get notified about new products and offers</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
              />
              <button className="px-6 py-3 bg-gold-400 text-dark-600 font-semibold rounded-xl hover:bg-gold-500 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🌾</span>
              <div>
                <h3 className="text-xl font-display font-bold">Sri Kurmanandha</h3>
                <p className="text-xs text-gold-400 -mt-1">Premium Stores</p>
              </div>
            </div>
            <p className="text-dark-100 leading-relaxed mb-6">
              Providing premium quality rice and grocery products for generations. 
              Pure tradition, pure quality.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaYoutube, FaWhatsapp].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-display">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/products', label: 'All Products' },
                { to: '/rice-varieties', label: 'Rice Varieties' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-dark-100 hover:text-gold-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold-400 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-display">Categories</h4>
            <ul className="space-y-3">
              {['Premium Basmati Rice', 'Sona Masoori', 'Brown Rice', 'Pulses & Dals', 'Spices', 'Cooking Oils'].map((cat) => (
                <li key={cat}>
                  <Link to="/products" className="text-dark-100 hover:text-gold-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold-400 rounded-full" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 font-display">Contact Info</h4>
            <ul className="space-y-4">
              {[
                { icon: HiOutlineLocationMarker, text: 'Sri Kurmanandha Rice & General Stores,near srikakulam old bus stand,Srikakulam dist, Andhra Pradesh, 532401' },
                { icon: HiOutlinePhone, text: '+91 90634 69265' },
                { icon: HiOutlineMail, text: 'appannarella4@gmail.com' },
                { icon: HiOutlineClock, text: 'Mon - Sat: 8:00 AM - 9:00 PM' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-gold-400 mt-0.5 shrink-0" />
                  <span className="text-dark-100">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-200 text-sm">
            © {new Date().getFullYear()} Sri Kurmanandha Rice & General Stores. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-dark-200">
            <Link to="/" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
