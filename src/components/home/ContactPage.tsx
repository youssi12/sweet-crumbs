import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const hours = [
    { day: 'Monday – Friday', hours: '7:00 AM – 7:00 PM' },
    { day: 'Saturday', hours: '7:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: '8:00 AM – 4:00 PM' },
    { day: 'Public Holidays', hours: '9:00 AM – 2:00 PM' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#FFF8F0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="accent-text text-2xl mb-1">
            We'd love to hear from you
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-heading">
            Get in Touch
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="p-7 rounded-3xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
              <h2 className="font-display font-bold text-2xl mb-6" style={{ color: '#3D1C1C' }}>Send us a message</h2>

              {sent && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-4 rounded-xl text-sm font-medium" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                  ✅ Message sent! We'll get back to you within 24 hours.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Your Name</label>
                    <input className="input-bakery" placeholder="Emma Dubois" required value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Email Address</label>
                    <input type="email" className="input-bakery" placeholder="emma@email.com" required value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Subject</label>
                  <select className="input-bakery" value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                    <option value="">Select a topic...</option>
                    <option>Custom cake enquiry</option>
                    <option>Catering & events</option>
                    <option>Order issue</option>
                    <option>Wholesale / partnership</option>
                    <option>General question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Message</label>
                  <textarea className="input-bakery resize-none" rows={5} placeholder="Tell us how we can help..."
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  <Send size={16} /> Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-5">
            {/* Contact details */}
            <div className="p-6 rounded-3xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
              <h2 className="font-display font-bold text-xl mb-5" style={{ color: '#3D1C1C' }}>Contact Details</h2>
              <div className="space-y-4">
                {[
                  { Icon: MapPin, label: 'Address', value: '127 Blossom Lane, Brooklyn, NY 11201' },
                  { Icon: Phone, label: 'Phone', value: '+1 (555) 234-5678', href: 'tel:+15552345678' },
                  { Icon: Mail, label: 'Email', value: 'hello@sweetcrumbs.com', href: 'mailto:hello@sweetcrumbs.com' },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#FFE4D6' }}>
                      <Icon size={18} style={{ color: '#FF94AF' }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: '#8B5E5E' }}>{label}</p>
                      {href ? (
                        <a href={href} className="text-sm hover:text-rose-400 transition-colors" style={{ color: '#3D1C1C' }}>{value}</a>
                      ) : (
                        <p className="text-sm" style={{ color: '#3D1C1C' }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-5 pt-5 border-t" style={{ borderColor: '#FFD0DC' }}>
                <p className="text-xs font-semibold mb-3" style={{ color: '#8B5E5E' }}>Follow us</p>
                <div className="flex gap-3">
                  {[
                    { Icon: Instagram, label: '@sweetcrumbs.bk', href: '#' },
                    { Icon: Facebook, label: 'Sweet Crumbs Bakery', href: '#' },
                    { Icon: Twitter, label: '@sweetcrumbsbk', href: '#' },
                  ].map(({ Icon, label, href }) => (
                    <a key={label} href={href}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105"
                      style={{ background: '#FFE4D6', color: '#8B5E5E' }}>
                      <Icon size={13} style={{ color: '#FF94AF' }} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 rounded-3xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
              <div className="flex items-center gap-2 mb-5">
                <Clock size={18} style={{ color: '#FF94AF' }} />
                <h2 className="font-display font-bold text-xl" style={{ color: '#3D1C1C' }}>Opening Hours</h2>
              </div>
              <div className="space-y-3">
                {hours.map(h => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span style={{ color: '#8B5E5E' }}>{h.day}</span>
                    <span className="font-medium" style={{ color: '#3D1C1C' }}>{h.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: '#FFE4D6', color: '#8B5E5E' }}>
                🚚 Online orders accepted 24/7 for next-day pickup or delivery.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden h-64 relative"
          style={{ background: 'linear-gradient(135deg, #FFE4D6, #FFD0DC)' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <MapPin size={40} style={{ color: '#FF94AF' }} />
            <p className="font-display font-bold text-xl" style={{ color: '#3D1C1C' }}>127 Blossom Lane, Brooklyn</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Open in Google Maps
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
