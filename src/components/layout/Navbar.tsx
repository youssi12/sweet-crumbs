import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Moon, Sun, Menu, X, Search, Heart, User } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useDarkMode } from '../../hooks/useDarkMode';

export const Navbar: React.FC = () => {
  const { itemCount, toggleCart } = useCart();
  const { isDark, toggle } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/about', label: 'Our Story' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass shadow-bakery py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}>
              <span className="text-white text-lg">🍰</span>
            </div>
            <div>
              <span className="font-display text-xl font-bold" style={{ color: '#3D1C1C' }}>Sweet</span>
              <span className="font-accent text-xl ml-1" style={{ color: '#FF94AF' }}>Crumbs</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full transition-colors hover:bg-rose-100 dark:hover:bg-rose-900/20"
              aria-label="Search"
            >
              <Search size={18} style={{ color: '#8B5E5E' }} />
            </button>
            <Link
              to="/dashboard/favorites"
              className="p-2 rounded-full transition-colors hover:bg-rose-100 dark:hover:bg-rose-900/20 hidden sm:flex"
              aria-label="Favorites"
            >
              <Heart size={18} style={{ color: '#8B5E5E' }} />
            </Link>
            <Link
              to="/dashboard"
              className="p-2 rounded-full transition-colors hover:bg-rose-100 dark:hover:bg-rose-900/20 hidden sm:flex"
              aria-label="Account"
            >
              <User size={18} style={{ color: '#8B5E5E' }} />
            </Link>
            <button
              onClick={toggle}
              className="p-2 rounded-full transition-colors hover:bg-rose-100 dark:hover:bg-rose-900/20"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} style={{ color: '#8B5E5E' }} /> : <Moon size={18} style={{ color: '#8B5E5E' }} />}
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} color="white" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold text-white rounded-full flex items-center justify-center"
                  style={{ background: '#D91A4A' }}
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-rose-100"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={20} style={{ color: '#3D1C1C' }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
            style={{ background: 'rgba(61,28,28,0.5)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl"
            >
              <form onSubmit={handleSearch} className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8B5E5E' }} />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search cakes, croissants, cookies..."
                  className="w-full pl-12 pr-12 py-4 rounded-2xl text-lg input-bakery shadow-bakery-lg"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X size={20} style={{ color: '#8B5E5E' }} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 glass flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}>
                  <span className="text-white text-lg">🍰</span>
                </div>
                <span className="font-display text-xl font-bold" style={{ color: '#3D1C1C' }}>Sweet <span className="font-accent" style={{ color: '#FF94AF' }}>Crumbs</span></span>
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="p-2">
                <X size={24} style={{ color: '#3D1C1C' }} />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setIsMobileOpen(false)}
                    className="block text-2xl font-display py-3 border-b"
                    style={{ borderColor: '#FFD0DC', color: '#3D1C1C' }}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 }}>
                <Link to="/dashboard" onClick={() => setIsMobileOpen(false)} className="block text-2xl font-display py-3 border-b" style={{ borderColor: '#FFD0DC', color: '#3D1C1C' }}>
                  My Account
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
