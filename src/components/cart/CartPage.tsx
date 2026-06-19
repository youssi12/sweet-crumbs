import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, total } = useCart();
  const delivery = total > 35 ? 0 : 4.99;
  const tax = total * 0.08;

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#FFF8F0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold mb-8" style={{ color: '#3D1C1C' }}>Your Cart</h1>
        </motion.div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="font-display text-3xl mb-3" style={{ color: '#3D1C1C' }}>Your cart is empty</h2>
            <p className="mb-8" style={{ color: '#8B5E5E' }}>Start adding some of our delicious treats!</p>
            <Link to="/products" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.product.id}
                    layout
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-4 rounded-2xl"
                    style={{ background: 'white', border: '1px solid #FFD0DC' }}
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#FF94AF' }}>{item.product.category}</p>
                          <h3 className="font-display font-semibold" style={{ color: '#3D1C1C' }}>{item.product.name}</h3>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="p-1.5 rounded-full hover:bg-rose-100 transition-colors">
                          <Trash2 size={15} style={{ color: '#D91A4A' }} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 p-2 rounded-xl" style={{ background: '#FFF0E0' }}>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                            <Minus size={14} style={{ color: '#3D1C1C' }} />
                          </button>
                          <span className="w-6 text-center font-semibold text-sm" style={{ color: '#3D1C1C' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                            <Plus size={14} style={{ color: '#3D1C1C' }} />
                          </button>
                        </div>
                        <span className="font-bold text-lg" style={{ color: '#3D1C1C' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Promo code */}
              <div className="flex gap-3 mt-4">
                <div className="relative flex-1">
                  <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8B5E5E' }} />
                  <input type="text" placeholder="Promo code" className="input-bakery pl-9 text-sm" />
                </div>
                <button className="btn-secondary text-sm px-5 py-2.5">Apply</button>
              </div>
            </div>

            {/* Summary */}
            <div className="h-fit sticky top-24">
              <div className="p-6 rounded-2xl space-y-4" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
                <h2 className="font-display font-bold text-xl" style={{ color: '#3D1C1C' }}>Order Summary</h2>

                <div className="space-y-2 text-sm">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between" style={{ color: '#8B5E5E' }}>
                      <span className="truncate mr-2">{item.product.name} ×{item.quantity}</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2" style={{ borderColor: '#FFD0DC' }}>
                  <div className="flex justify-between text-sm" style={{ color: '#8B5E5E' }}>
                    <span>Subtotal</span><span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: '#8B5E5E' }}>
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>
                      {delivery === 0 ? 'Free!' : `$${delivery.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: '#8B5E5E' }}>
                    <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-lg" style={{ borderColor: '#FFD0DC', color: '#3D1C1C' }}>
                  <span>Total</span>
                  <span>${(total + delivery + tax).toFixed(2)}</span>
                </div>

                {total < 35 && (
                  <p className="text-xs text-center py-2 px-3 rounded-xl" style={{ background: '#FFE4D6', color: '#8B5E5E' }}>
                    Add ${(35 - total).toFixed(2)} more for free delivery! 🚚
                  </p>
                )}

                <Link to="/checkout" className="btn-primary w-full justify-center">
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>

                <div className="text-center space-y-1">
                  <Link to="/products" className="text-xs block" style={{ color: '#8B5E5E' }}>← Continue Shopping</Link>
                  <p className="text-xs" style={{ color: '#8B5E5E' }}>🔒 Secure · SSL Encrypted</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
