import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, ChevronLeft, Plus, Minus, Package, Clock, Leaf } from 'lucide-react';
import { products } from '../../data/mockData';
import { ProductCard } from './ProductCard';
import { useCart } from '../../hooks/useCart';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addItem, toggleCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'allergens'>('desc');

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍰</div>
          <h2 className="font-display text-2xl mb-2" style={{ color: '#3D1C1C' }}>Product not found</h2>
          <Link to="/products" className="btn-primary mt-4">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      toggleCart();
    }, 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#FFF8F0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: '#8B5E5E' }}>
          <Link to="/" className="hover:text-rose-400">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-rose-400">Shop</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="capitalize hover:text-rose-400">{product.category}</Link>
          <span>/</span>
          <span style={{ color: '#3D1C1C' }}>{product.name}</span>
        </nav>

        <Link to="/products" className="inline-flex items-center gap-1 text-sm mb-6 transition-colors hover:text-rose-400" style={{ color: '#8B5E5E' }}>
          <ChevronLeft size={16} /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl overflow-hidden mb-4 aspect-square"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-xl overflow-hidden w-20 h-20 transition-all duration-200 ${selectedImage === i ? 'ring-2 scale-105' : 'opacity-60 hover:opacity-100'}`}
                    style={{ ringColor: '#FF94AF' }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                {product.badge && <span className="badge mb-3 block w-fit">{product.badge}</span>}
                <p className="text-sm uppercase tracking-wider font-medium mb-2" style={{ color: '#FF94AF' }}>{product.category}</p>
                <h1 className="font-display text-3xl md:text-4xl font-bold" style={{ color: '#3D1C1C' }}>{product.name}</h1>
              </div>
              <button onClick={() => setLiked(!liked)} className="p-3 rounded-full transition-colors hover:bg-rose-100">
                <Heart size={22} fill={liked ? '#D91A4A' : 'none'} style={{ color: liked ? '#D91A4A' : '#8B5E5E' }} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#FFAA88' : 'none'} style={{ color: i < Math.floor(product.rating) ? '#FFAA88' : '#FFD0DC' }} />
                ))}
              </div>
              <span className="font-semibold text-sm" style={{ color: '#3D1C1C' }}>{product.rating}</span>
              <span className="text-sm" style={{ color: '#8B5E5E' }}>({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold" style={{ color: '#3D1C1C' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl line-through" style={{ color: '#FFAA88' }}>${product.originalPrice.toFixed(2)}</span>
                  <span className="badge">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                </>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 border-b" style={{ borderColor: '#FFD0DC' }}>
              {(['desc', 'ingredients', 'allergens'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-rose-400' : 'border-transparent'}`}
                  style={{ color: activeTab === tab ? '#FF94AF' : '#8B5E5E' }}
                >
                  {tab === 'desc' ? 'Description' : tab === 'allergens' ? 'Allergens' : 'Ingredients'}
                </button>
              ))}
            </div>
            <div className="mb-6 text-sm leading-relaxed" style={{ color: '#8B5E5E' }}>
              {activeTab === 'desc' && <p>{product.longDescription}</p>}
              {activeTab === 'ingredients' && (
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map(ing => (
                    <span key={ing} className="px-3 py-1 rounded-full text-xs" style={{ background: '#FFE4D6', color: '#8B5E5E' }}>{ing}</span>
                  ))}
                </div>
              )}
              {activeTab === 'allergens' && (
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map(a => (
                    <span key={a} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#FFD0DC', color: '#D91A4A' }}>{a}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              {product.weight && (
                <div className="flex items-center gap-1.5" style={{ color: '#8B5E5E' }}>
                  <Package size={14} style={{ color: '#FF94AF' }} />
                  {product.weight}
                </div>
              )}
              {product.servings && (
                <div className="flex items-center gap-1.5" style={{ color: '#8B5E5E' }}>
                  <Leaf size={14} style={{ color: '#FF94AF' }} />
                  Serves {product.servings}
                </div>
              )}
              <div className="flex items-center gap-1.5" style={{ color: '#8B5E5E' }}>
                <Clock size={14} style={{ color: '#FF94AF' }} />
                Same-day pickup available
              </div>
            </div>

            {/* Stock */}
            {product.stock <= 10 && (
              <div className="mb-4 px-3 py-2 rounded-xl text-xs font-semibold inline-block" style={{ background: '#FFD0DC', color: '#D91A4A' }}>
                ⚡ Only {product.stock} left — order soon!
              </div>
            )}

            {/* Quantity + Add */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-rose-400 transition-colors">
                  <Minus size={16} style={{ color: '#3D1C1C' }} />
                </button>
                <span className="w-8 text-center font-semibold" style={{ color: '#3D1C1C' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="hover:text-rose-400 transition-colors">
                  <Plus size={16} style={{ color: '#3D1C1C' }} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 justify-center"
                style={added ? { background: '#16a34a' } : {}}
              >
                <ShoppingBag size={18} />
                {added ? 'Added to Cart!' : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
              </button>
            </div>

            <p className="text-xs text-center" style={{ color: '#8B5E5E' }}>🚚 Free delivery on orders over $35 · 🔒 Secure checkout</p>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-3xl font-bold mb-8" style={{ color: '#3D1C1C' }}>You might also love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
