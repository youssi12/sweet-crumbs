import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(61,28,28,0.4)', backdropFilter: 'blur(4px)' }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{ background: '#FFF8F0' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#FFD0DC' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}>
                  <ShoppingBag size={18} color="white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg" style={{ color: '#3D1C1C' }}>Your Cart</h2>
                  <p className="text-xs" style={{ color: '#8B5E5E' }}>{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full transition-colors hover:bg-rose-100"
              >
                <X size={20} style={{ color: '#3D1C1C' }} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="text-6xl">🛒</div>
                  <h3 className="font-display text-xl" style={{ color: '#3D1C1C' }}>Your cart is empty</h3>
                  <p className="text-sm text-center" style={{ color: '#8B5E5E' }}>Add some delicious treats to get started!</p>
                  <button onClick={closeCart}>
                    <Link to="/products" className="btn-primary text-sm">
                      Browse Products
                    </Link>
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 p-3 rounded-2xl"
                    style={{ background: 'white', border: '1px solid #FFD0DC' }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate" style={{ color: '#3D1C1C' }}>{item.product.name}</h4>
                      <p className="text-xs mt-0.5" style={{ color: '#8B5E5E' }}>${item.product.price.toFixed(2)} each</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                            style={{ background: '#FFE4D6' }}
                          >
                            <Minus size={10} style={{ color: '#3D1C1C' }} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold" style={{ color: '#3D1C1C' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                            style={{ background: '#FFE4D6' }}
                          >
                            <Plus size={10} style={{ color: '#3D1C1C' }} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm" style={{ color: '#FF94AF' }}>
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 rounded-full hover:bg-rose-100 transition-colors"
                          >
                            <Trash2 size={13} style={{ color: '#D91A4A' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t space-y-3" style={{ borderColor: '#FFD0DC', background: 'white' }}>
                <div className="flex justify-between text-sm" style={{ color: '#8B5E5E' }}>
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: '#8B5E5E' }}>
                  <span>Delivery</span>
                  <span className="text-green-600">Free over $35</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-3" style={{ borderColor: '#FFD0DC', color: '#3D1C1C' }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full justify-center text-sm"
                >
                  Checkout <ArrowRight size={16} />
                </Link>
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="block text-center text-sm transition-colors hover:text-rose-500"
                  style={{ color: '#8B5E5E' }}
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
