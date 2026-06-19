import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products } from '../../data/mockData';
import { ProductCard } from '../products/ProductCard';

const CATEGORIES = ['all', 'cakes', 'croissants', 'cookies', 'bread', 'seasonal'];

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 60]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
    const s = searchParams.get('search');
    if (s) setSearch(s);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        p.category.includes(q)
      );
    }

    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [search, category, sortBy, priceRange]);

  const clearSearch = () => {
    setSearch('');
    setCategory('all');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#FFF8F0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="accent-text text-2xl mb-1">
            Freshly made, daily
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-heading">
            Our Bakery
          </motion.h1>
          <p className="mt-3 text-sm" style={{ color: '#8B5E5E' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Search + Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8B5E5E' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input-bakery pl-10 pr-10"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X size={14} style={{ color: '#8B5E5E' }} />
              </button>
            )}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-bakery w-full sm:w-48"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors text-sm font-medium ${showFilters ? '' : ''}`}
            style={{ borderColor: '#FFD0DC', color: '#8B5E5E', background: showFilters ? '#FFD0DC' : 'white' }}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize"
              style={
                category === cat
                  ? { background: 'linear-gradient(135deg, #FF94AF, #FFAA88)', color: 'white', boxShadow: '0 4px 15px rgba(255,148,175,0.4)' }
                  : { background: 'white', color: '#8B5E5E', border: '1px solid #FFD0DC' }
              }
            >
              {cat === 'all' ? 'All Items' : cat}
            </button>
          ))}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-5 rounded-2xl"
            style={{ background: 'white', border: '1px solid #FFD0DC' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#3D1C1C' }}>
                  Price Range: ${priceRange[0]} – ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-rose-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#3D1C1C' }}>Quick filters</label>
                <div className="flex flex-wrap gap-2">
                  {['Bestseller', 'New', 'On Sale', 'Gluten-free'].map(f => (
                    <button key={f} className="px-3 py-1.5 rounded-full text-xs border transition-colors hover:border-rose-300"
                      style={{ border: '1px solid #FFD0DC', color: '#8B5E5E' }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active filters */}
        {(search || category !== 'all') && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs" style={{ color: '#8B5E5E' }}>Filters:</span>
            {search && (
              <span className="badge flex items-center gap-1">
                "{search}" <button onClick={() => setSearch('')}><X size={10} /></button>
              </span>
            )}
            {category !== 'all' && (
              <span className="badge flex items-center gap-1 capitalize">
                {category} <button onClick={() => setCategory('all')}><X size={10} /></button>
              </span>
            )}
            <button onClick={clearSearch} className="text-xs underline" style={{ color: '#FF94AF' }}>Clear all</button>
          </div>
        )}

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-2xl mb-2" style={{ color: '#3D1C1C' }}>No results found</h3>
            <p className="mb-6" style={{ color: '#8B5E5E' }}>Try a different search or browse all products.</p>
            <button onClick={clearSearch} className="btn-primary">Browse all</button>
          </div>
        )}
      </div>
    </div>
  );
};
