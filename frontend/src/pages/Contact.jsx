import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[0-9]{10}$/.test(form.phone)) errs.phone = 'Enter valid 10-digit phone';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white" data-aos="fade-up">Contact Us</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            We'd love to hear from you. Get in touch with us.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6" data-aos="fade-right">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-display font-bold mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  {[
                    { icon: HiOutlineLocationMarker, label: 'Address', value: '123 Main Market Street,\nCity, 500001' },
                    { icon: HiOutlinePhone, label: 'Phone', value: '+91 98765 43210' },
                    { icon: HiOutlineMail, label: 'Email', value: 'info@srikurmanandha.com' },
                    { icon: HiOutlineClock, label: 'Business Hours', value: 'Mon - Sat: 8:00 AM - 9:00 PM\nSunday: 9:00 AM - 6:00 PM' },
                  ].map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                        <info.icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <p className="font-semibold">{info.label}</p>
                        <p className="text-dark-300 text-sm whitespace-pre-line">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 text-white p-4 rounded-2xl font-semibold hover:bg-green-600 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <FaWhatsapp className="w-6 h-6" /> Chat on WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2" data-aos="fade-left">
              <motion.div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-display font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2">Name *</label>
                      <input value={form.name} onChange={(e) => update('name', e.target.value)} className={`input-field ${errors.name ? 'border-red-500' : ''}`} placeholder="Your name" />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Email *</label>
                      <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={`input-field ${errors.email ? 'border-red-500' : ''}`} placeholder="your@email.com" />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2">Phone *</label>
                      <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={`input-field ${errors.phone ? 'border-red-500' : ''}`} placeholder="9876543210" />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Subject</label>
                      <input value={form.subject} onChange={(e) => update('subject', e.target.value)} className="input-field" placeholder="How can we help?" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Message *</label>
                    <textarea value={form.message} onChange={(e) => update('message', e.target.value)} className={`input-field h-32 ${errors.message ? 'border-red-500' : ''}`} placeholder="Write your message..." />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="btn-primary px-10 py-3.5 text-lg">Send Message</button>
                </form>
              </motion.div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-lg h-80" data-aos="fade-up">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5!2d78.4!3d17.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzAwLjAiTiA3OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
