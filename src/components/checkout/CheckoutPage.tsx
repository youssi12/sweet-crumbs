import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Truck, Store, ChevronRight, Lock } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

type Step = 'details' | 'delivery' | 'payment' | 'confirmation';

export const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('details');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('delivery');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const tax = total * 0.08;
  const delivery = deliveryType === 'pickup' ? 0 : (total > 35 ? 0 : 4.99);
  const orderTotal = total + delivery + tax;

  const steps: { id: Step; label: string }[] = [
    { id: 'details', label: 'Details' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmation', label: 'Done' },
  ];

  const stepIdx = steps.findIndex(s => s.id === step);

  const handleNext = () => {
    const order = ['details', 'delivery', 'payment', 'confirmation'] as const;
    const idx = order.indexOf(step);
    if (idx < order.length - 1) {
      setStep(order[idx + 1]);
    }
  };

  const handlePlaceOrder = () => {
    setStep('confirmation');
    clearCart();
  };

  const handleInput = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-display text-2xl mb-4" style={{ color: '#3D1C1C' }}>Cart is empty</h2>
          <Link to="/products" className="btn-primary">Start shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#FFF8F0' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold mb-8" style={{ color: '#3D1C1C' }}>Checkout</h1>

        {/* Steps */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i < stepIdx ? 'text-white' : i === stepIdx ? 'text-white' : 'text-gray-400 border-2'
                }`}
                  style={i <= stepIdx ? { background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' } : { background: '#FFE4D6', border: '2px solid #FFD0DC' }}>
                  {i < stepIdx ? <Check size={16} /> : i + 1}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: i <= stepIdx ? '#FF94AF' : '#8B5E5E' }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2" style={{ background: i < stepIdx ? 'linear-gradient(90deg, #FF94AF, #FFAA88)' : '#FFE4D6' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 'details' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
                    <h2 className="font-display font-bold text-xl mb-5" style={{ color: '#3D1C1C' }}>Contact Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>First Name</label>
                        <input className="input-bakery" placeholder="Emma" value={form.firstName} onChange={handleInput('firstName')} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Last Name</label>
                        <input className="input-bakery" placeholder="Dubois" value={form.lastName} onChange={handleInput('lastName')} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Email</label>
                        <input type="email" className="input-bakery" placeholder="emma@email.com" value={form.email} onChange={handleInput('email')} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Phone</label>
                        <input type="tel" className="input-bakery" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleInput('phone')} />
                      </div>
                    </div>
                  </div>
                  <button onClick={handleNext} className="btn-primary w-full justify-center">
                    Continue to Delivery <ChevronRight size={16} />
                  </button>
                </div>
                <CheckoutSummary items={items} total={total} delivery={delivery} tax={tax} orderTotal={orderTotal} />
              </div>
            )}

            {step === 'delivery' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
                    <h2 className="font-display font-bold text-xl mb-5" style={{ color: '#3D1C1C' }}>How would you like to receive your order?</h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      {[
                        { value: 'delivery' as const, Icon: Truck, label: 'Delivery', sub: 'Get it delivered to your door' },
                        { value: 'pickup' as const, Icon: Store, label: 'Pick Up', sub: 'Ready in 2 hrs at our bakery' },
                      ].map(({ value, Icon, label, sub }) => (
                        <button
                          key={value}
                          onClick={() => setDeliveryType(value)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left`}
                          style={deliveryType === value ? { borderColor: '#FF94AF', background: '#FFF0F4' } : { borderColor: '#FFD0DC', background: 'white' }}
                        >
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: deliveryType === value ? '#FF94AF' : '#FFE4D6' }}>
                            <Icon size={18} color={deliveryType === value ? 'white' : '#8B5E5E'} />
                          </div>
                          <div>
                            <p className="font-semibold" style={{ color: '#3D1C1C' }}>{label}</p>
                            <p className="text-xs" style={{ color: '#8B5E5E' }}>{sub}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {deliveryType === 'delivery' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Street Address</label>
                          <input className="input-bakery" placeholder="12 Maple Street, Apt 3B" value={form.address} onChange={handleInput('address')} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>City</label>
                            <input className="input-bakery" placeholder="Brooklyn" value={form.city} onChange={handleInput('city')} />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>ZIP</label>
                            <input className="input-bakery" placeholder="11201" value={form.zip} onChange={handleInput('zip')} />
                          </div>
                        </div>
                      </div>
                    )}

                    {deliveryType === 'pickup' && (
                      <div className="p-4 rounded-xl" style={{ background: '#FFE4D6' }}>
                        <p className="font-semibold text-sm mb-1" style={{ color: '#3D1C1C' }}>Sweet Crumbs Bakery</p>
                        <p className="text-xs" style={{ color: '#8B5E5E' }}>127 Blossom Lane, Brooklyn, NY 11201</p>
                        <p className="text-xs mt-1" style={{ color: '#8B5E5E' }}>Mon–Fri: 7am–7pm · Sat–Sun: 7am–5pm</p>
                      </div>
                    )}
                  </div>
                  <button onClick={handleNext} className="btn-primary w-full justify-center">
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </div>
                <CheckoutSummary items={items} total={total} delivery={delivery} tax={tax} orderTotal={orderTotal} />
              </div>
            )}

            {step === 'payment' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
                    <div className="flex items-center gap-2 mb-5">
                      <h2 className="font-display font-bold text-xl" style={{ color: '#3D1C1C' }}>Payment Details</h2>
                      <Lock size={14} style={{ color: '#8B5E5E' }} />
                    </div>
                    <div className="p-3 rounded-xl mb-5 flex items-center gap-2 text-xs" style={{ background: '#F0FDF4', color: '#16a34a' }}>
                      <Lock size={12} />
                      This is a demo — no real payment will be processed.
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Name on Card</label>
                        <input className="input-bakery" placeholder="Emma Dubois" value={form.cardName} onChange={handleInput('cardName')} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Card Number</label>
                        <div className="relative">
                          <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8B5E5E' }} />
                          <input className="input-bakery pl-10" placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={handleInput('cardNumber')} maxLength={19} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Expiry</label>
                          <input className="input-bakery" placeholder="MM/YY" value={form.expiry} onChange={handleInput('expiry')} maxLength={5} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>CVV</label>
                          <input className="input-bakery" placeholder="123" value={form.cvv} onChange={handleInput('cvv')} maxLength={4} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs mt-4 flex items-center gap-1" style={{ color: '#8B5E5E' }}>
                      <Lock size={11} /> Your payment info is encrypted and secure.
                    </p>
                  </div>
                  <button onClick={handlePlaceOrder} className="btn-primary w-full justify-center text-base">
                    <Lock size={16} /> Place Order — ${orderTotal.toFixed(2)}
                  </button>
                </div>
                <CheckoutSummary items={items} total={total} delivery={delivery} tax={tax} orderTotal={orderTotal} />
              </div>
            )}

            {step === 'confirmation' && (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}
                >
                  <Check size={48} color="white" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <h2 className="font-display text-4xl font-bold mb-3" style={{ color: '#3D1C1C' }}>Order Placed! 🎉</h2>
                  <p className="mb-1" style={{ color: '#8B5E5E' }}>Thank you for your order from Sweet Crumbs.</p>
                  <p className="mb-6" style={{ color: '#8B5E5E' }}>Order confirmation has been sent to your email.</p>
                  <div className="inline-block px-6 py-3 rounded-2xl mb-8" style={{ background: '#FFE4D6' }}>
                    <p className="text-xs mb-1" style={{ color: '#8B5E5E' }}>Order ID</p>
                    <p className="font-bold text-lg" style={{ color: '#3D1C1C' }}>SC-2024-{Math.floor(1059 + Math.random() * 100)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dashboard/orders" className="btn-primary">Track My Order</Link>
                    <Link to="/products" className="btn-secondary">Continue Shopping</Link>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const CheckoutSummary: React.FC<{ items: any[]; total: number; delivery: number; tax: number; orderTotal: number }> = ({ items, total, delivery, tax, orderTotal }) => (
  <div className="h-fit sticky top-24">
    <div className="p-5 rounded-2xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
      <h3 className="font-display font-bold mb-4" style={{ color: '#3D1C1C' }}>Order ({items.length} items)</h3>
      <div className="space-y-3 mb-4">
        {items.map(item => (
          <div key={item.product.id} className="flex gap-3">
            <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: '#3D1C1C' }}>{item.product.name}</p>
              <p className="text-xs" style={{ color: '#8B5E5E' }}>×{item.quantity}</p>
            </div>
            <span className="text-xs font-semibold flex-shrink-0" style={{ color: '#3D1C1C' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-3 space-y-1.5" style={{ borderColor: '#FFD0DC' }}>
        <div className="flex justify-between text-xs" style={{ color: '#8B5E5E' }}><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
        <div className="flex justify-between text-xs" style={{ color: '#8B5E5E' }}><span>Delivery</span><span>{delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}</span></div>
        <div className="flex justify-between text-xs" style={{ color: '#8B5E5E' }}><span>Tax</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold pt-2 border-t" style={{ borderColor: '#FFD0DC', color: '#3D1C1C' }}>
          <span>Total</span><span>${orderTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
);
