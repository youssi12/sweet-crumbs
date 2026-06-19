import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="card-bakery group cursor-pointer"
    >
      <Link to={`/products/${product.id}`}>
        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="badge text-xs">{product.badge}</span>
            </div>
          )}

          {/* Discount */}
          {product.originalPrice && (
            <div className="absolute top-3 right-12">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: '#D91A4A' }}>
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </div>
          )}

          {/* Like button */}
          <button
            onClick={e => { e.preventDefault(); setLiked(!liked); }}
            className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.9)' }}
          >
            <Heart size={14} fill={liked ? '#D91A4A' : 'none'} style={{ color: liked ? '#D91A4A' : '#8B5E5E' }} />
          </button>

          {/* Quick view */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white"
              style={{ background: 'rgba(61,28,28,0.8)', backdropFilter: 'blur(4px)' }}>
              <Eye size={12} /> Quick View
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#FF94AF' }}>
            {product.category}
          </p>
          <h3 className="font-display font-semibold text-base leading-tight mb-2 line-clamp-1" style={{ color: '#3D1C1C' }}>
            {product.name}
          </h3>
          <p className="text-xs line-clamp-2 mb-3" style={{ color: '#8B5E5E' }}>
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={i < Math.floor(product.rating) ? '#FFAA88' : 'none'}
                style={{ color: i < Math.floor(product.rating) ? '#FFAA88' : '#FFD0DC' }}
              />
            ))}
            <span className="text-xs ml-1" style={{ color: '#8B5E5E' }}>({product.reviews})</span>
          </div>

          {/* Price + Add */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-lg" style={{ color: '#3D1C1C' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs line-through ml-2" style={{ color: '#FFAA88' }}>${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: added ? '#16a34a' : 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}
            >
              <ShoppingBag size={13} />
              {added ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
