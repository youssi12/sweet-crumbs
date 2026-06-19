import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, ChevronDown, Award, Clock, Truck, Heart } from 'lucide-react';
import { products, reviews } from '../../data/mockData';
import { ProductCard } from '../products/ProductCard';

export const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const featured = products.filter(p => p.isBestseller || p.isNew).slice(0, 4);

  const categories = [
    { label: 'Cakes', emoji: '🎂', color: '#FFD0DC', count: products.filter(p => p.category === 'cakes').length },
    { label: 'Croissants', emoji: '🥐', color: '#FFE4D6', count: products.filter(p => p.category === 'croissants').length },
    { label: 'Cookies', emoji: '🍪', color: '#FFCAB4', count: products.filter(p => p.category === 'cookies').length },
    { label: 'Bread', emoji: '🍞', color: '#FFD0DC', count: products.filter(p => p.category === 'bread').length },
    { label: 'Seasonal', emoji: '🌸', color: '#FFE4D6', count: products.filter(p => p.category === 'seasonal').length },
  ];

  const features = [
    { Icon: Award, title: 'Award-Winning', desc: 'Recognized by the NY Pastry Guild 3 years running' },
    { Icon: Clock, title: 'Baked Fresh Daily', desc: 'Every item made from scratch every morning at 5am' },
    { Icon: Truck, title: 'Same-Day Delivery', desc: 'Order by 12pm for afternoon delivery in NYC' },
    { Icon: Heart, title: 'Made With Love', desc: 'Family recipes refined over a decade of craft' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFF0E0 0%, #FFE4D6 40%, #FFD0DC 100%)' }}
      >
        {/* Floating decorative circles */}
        <motion.div animate={{ y: [-10, 10], rotate: [0, 5] }} transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF94AF, #FFAA88)' }} />
        <motion.div animate={{ y: [10, -10], rotate: [0, -5] }} transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FFAA88, #FF94AF)' }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center pt-24">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(255,148,175,0.15)', border: '1px solid rgba(255,148,175,0.3)' }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#FF94AF' }}>
                🌸 Brooklyn's Favourite Bakery
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ color: '#3D1C1C' }}
            >
              Baked with{' '}
              <span className="italic" style={{ color: '#FF94AF' }}>love,</span>
              <br />
              <span className="font-accent text-5xl md:text-6xl" style={{ color: '#FFAA88' }}>crafted</span>{' '}
              for you.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-lg mb-8 max-w-lg"
              style={{ color: '#8B5E5E' }}
            >
              Artisan pastries, celebration cakes, and freshly baked bread — made from scratch each morning in our Brooklyn kitchen since 2014.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/products" className="btn-primary text-base">
                Order Fresh Today <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn-secondary text-base">
                Our Story
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6 mt-10"
            >
              <div>
                <p className="font-bold text-2xl" style={{ color: '#3D1C1C' }}>10+</p>
                <p className="text-xs" style={{ color: '#8B5E5E' }}>Years baking</p>
              </div>
              <div className="w-px h-10" style={{ background: '#FFD0DC' }} />
              <div>
                <p className="font-bold text-2xl" style={{ color: '#3D1C1C' }}>892</p>
                <p className="text-xs" style={{ color: '#8B5E5E' }}>Happy customers</p>
              </div>
              <div className="w-px h-10" style={{ background: '#FFD0DC' }} />
              <div className="flex items-center gap-1">
                <Star size={16} fill="#FFAA88" style={{ color: '#FFAA88' }} />
                <p className="font-bold text-2xl" style={{ color: '#3D1C1C' }}>4.9</p>
                <p className="text-xs" style={{ color: '#8B5E5E' }}>avg rating</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="rounded-3xl overflow-hidden h-52 shadow-bakery-lg">
                  <img src="https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400&q=80" alt="Cake" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                <div className="rounded-3xl overflow-hidden h-36 shadow-bakery-lg">
                  <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80" alt="Croissant" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
            <div className="space-y-4 pt-8">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                <div className="rounded-3xl overflow-hidden h-40 shadow-bakery-lg">
                  <img src="https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&q=80" alt="Macarons" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
                <div className="rounded-3xl overflow-hidden h-48 shadow-bakery-lg">
                  <img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80" alt="Tart" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-8 -left-6 px-4 py-3 rounded-2xl shadow-bakery-lg"
              style={{ background: 'white', border: '1px solid #FFD0DC' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍰</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: '#3D1C1C' }}>Order Fresh</p>
                  <p className="text-xs" style={{ color: '#8B5E5E' }}>Ready in 2 hrs</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={24} style={{ color: '#FF94AF' }} />
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="accent-text text-2xl mb-2">Explore our range</p>
          <h2 className="section-heading">What we bake</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/products?category=${cat.label.toLowerCase()}`}
                className="flex flex-col items-center gap-2 px-8 py-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-card-hover group"
                style={{ background: cat.color, minWidth: 120 }}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
                <span className="font-semibold text-sm" style={{ color: '#3D1C1C' }}>{cat.label}</span>
                <span className="text-xs" style={{ color: '#8B5E5E' }}>{cat.count} items</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFE4D6)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 4px 16px rgba(255,148,175,0.2)' }}>
                <Icon size={22} style={{ color: '#FF94AF' }} />
              </div>
              <h3 className="font-display font-semibold" style={{ color: '#3D1C1C' }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#8B5E5E' }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <p className="accent-text text-2xl mb-1">Fresh from the oven</p>
            <h2 className="section-heading">Customer favourites</h2>
          </div>
          <Link to="/products" className="btn-secondary text-sm whitespace-nowrap">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Seasonal Banner */}
      <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
          style={{ minHeight: 300 }}
        >
          <img
            src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=1200&q=80"
            alt="Seasonal special"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(61,28,28,0.8) 40%, transparent)' }} />
          <div className="relative z-10 flex flex-col justify-center h-full p-10 max-w-lg">
            <span className="badge mb-4">Spring Seasonal</span>
            <h2 className="font-display text-4xl font-bold text-white mb-4">Cherry Blossom<br />Season is Here</h2>
            <p className="text-white/80 mb-6">Hand-crafted sakura cakes, yuzu tarts, and cherry blossom sugar flowers — available while the season lasts.</p>
            <Link to="/products?category=seasonal" className="btn-primary w-fit">
              Shop Seasonal <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="accent-text text-2xl mb-1">What people say</p>
          <h2 className="section-heading">Loved by thousands</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl"
              style={{ background: 'white', border: '1px solid #FFD0DC' }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="#FFAA88" style={{ color: '#FFAA88' }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4 italic" style={{ color: '#3D1C1C' }}>"{r.comment}"</p>
              <p className="text-xs font-semibold" style={{ color: '#8B5E5E' }}>— {r.customerName}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 px-4 sm:px-6 mx-4 sm:mx-6 mb-10 rounded-3xl" style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-3">Get the freshest news</h2>
          <p className="text-white/80 mb-8">Weekly recipes, seasonal specials, and exclusive subscriber discounts.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full border-0 outline-none text-sm"
              style={{ background: 'rgba(255,255,255,0.95)' }}
            />
            <button type="submit" className="px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:scale-105"
              style={{ background: '#3D1C1C' }}>
              Subscribe
            </button>
          </form>
          <p className="text-white/60 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};
