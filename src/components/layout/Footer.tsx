import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: 'linear-gradient(to bottom, #FFF0E0, #FFE4D6)' }} className="dark:bg-none dark:bg-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}>
                <span className="text-white text-lg">🍰</span>
              </div>
              <div>
                <span className="font-display text-xl font-bold" style={{ color: '#3D1C1C' }}>Sweet</span>
                <span className="font-accent text-xl ml-1" style={{ color: '#FF94AF' }}>Crumbs</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#8B5E5E' }}>
              Artisan baked goods crafted with love, the finest ingredients, and a decade of passion. Every bite tells a story.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'white', boxShadow: '0 2px 8px rgba(255,148,175,0.2)' }}
                >
                  <Icon size={16} style={{ color: '#FF94AF' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-semibold mb-4" style={{ color: '#3D1C1C' }}>Shop</h4>
            <ul className="space-y-2">
              {['All Products', 'Cakes', 'Croissants', 'Cookies', 'Bread', 'Seasonal Specials'].map(item => (
                <li key={item}>
                  <Link to="/products" className="text-sm transition-colors hover:text-rose-400" style={{ color: '#8B5E5E' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4" style={{ color: '#3D1C1C' }}>Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'Our Story', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'My Account', to: '/dashboard' },
                { label: 'Order Tracking', to: '/dashboard/orders' },
                { label: 'Gift Cards', to: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm transition-colors hover:text-rose-400" style={{ color: '#8B5E5E' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4" style={{ color: '#3D1C1C' }}>Visit Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} style={{ color: '#FF94AF', marginTop: 2, flexShrink: 0 }} />
                <span className="text-sm" style={{ color: '#8B5E5E' }}>127 Blossom Lane, Brooklyn, NY 11201</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} style={{ color: '#FF94AF', flexShrink: 0 }} />
                <a href="tel:+15552345678" className="text-sm hover:text-rose-400 transition-colors" style={{ color: '#8B5E5E' }}>+1 (555) 234-5678</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} style={{ color: '#FF94AF', flexShrink: 0 }} />
                <a href="mailto:hello@sweetcrumbs.com" className="text-sm hover:text-rose-400 transition-colors" style={{ color: '#8B5E5E' }}>hello@sweetcrumbs.com</a>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(255,148,175,0.1)' }}>
              <p className="text-xs font-semibold mb-1" style={{ color: '#3D1C1C' }}>Bakery Hours</p>
              <p className="text-xs" style={{ color: '#8B5E5E' }}>Mon–Fri: 7am – 7pm</p>
              <p className="text-xs" style={{ color: '#8B5E5E' }}>Sat–Sun: 7am – 5pm</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: '#FFD0DC' }}>
          <p className="text-xs" style={{ color: '#8B5E5E' }}>
            © 2024 Sweet Crumbs Bakery. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: '#8B5E5E' }}>
            Made with <Heart size={12} style={{ color: '#FF94AF' }} fill="#FF94AF" /> in Brooklyn, NY
          </p>
        </div>
      </div>
    </footer>
  );
};
