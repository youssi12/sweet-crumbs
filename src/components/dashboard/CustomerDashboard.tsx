import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Heart, User, MapPin, ChevronRight, Star, Clock, LogOut } from 'lucide-react';
import { currentCustomer, orders, products } from '../../data/mockData';

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: '#FFF3EE', text: '#F5673A', label: 'Pending' },
  preparing: { bg: '#FFF8E0', text: '#D97706', label: 'Preparing' },
  ready:     { bg: '#E8F5E9', text: '#2E7D32', label: 'Ready' },
  delivered: { bg: '#F3E5F5', text: '#7B1FA2', label: 'Delivered' },
  cancelled: { bg: '#FFEBEE', text: '#C62828', label: 'Cancelled' },
};

export const DashboardLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', label: 'Overview', Icon: User, end: true },
    { to: '/dashboard/orders', label: 'My Orders', Icon: Package },
    { to: '/dashboard/favorites', label: 'Favourites', Icon: Heart },
    { to: '/dashboard/addresses', label: 'Addresses', Icon: MapPin },
    { to: '/dashboard/profile', label: 'Profile', Icon: User },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#FFF8F0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
              {/* Profile header */}
              <div className="p-6 text-center" style={{ background: 'linear-gradient(135deg, #FFE4D6, #FFD0DC)' }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}>
                  {currentCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="font-display font-bold" style={{ color: '#3D1C1C' }}>{currentCustomer.name}</h2>
                <p className="text-xs mt-0.5" style={{ color: '#8B5E5E' }}>{currentCustomer.email}</p>
                <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(255,148,175,0.2)', color: '#D91A4A' }}>
                  <Star size={10} fill="#D91A4A" /> VIP Member
                </div>
              </div>

              {/* Nav */}
              <nav className="p-3 space-y-1">
                {navItems.map(({ to, label, Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'text-white' : ''}`
                    }
                    style={({ isActive }) => isActive
                      ? { background: 'linear-gradient(135deg, #FF94AF, #FFAA88)', color: 'white' }
                      : { color: '#8B5E5E' }
                    }
                  >
                    <Icon size={16} />
                    {label}
                  </NavLink>
                ))}
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-colors hover:bg-rose-50"
                  style={{ color: '#D91A4A' }}>
                  <LogOut size={16} /> Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export const DashboardOverview: React.FC = () => {
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold" style={{ color: '#3D1C1C' }}>
          Welcome back, {currentCustomer.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: '#8B5E5E' }}>Member since {new Date(currentCustomer.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Orders', value: currentCustomer.totalOrders, emoji: '📦' },
          { label: 'Total Spent', value: `$${currentCustomer.totalSpent.toFixed(0)}`, emoji: '💳' },
          { label: 'Favourites', value: currentCustomer.favoriteProducts.length, emoji: '❤️' },
        ].map(stat => (
          <div key={stat.label} className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className="font-display font-bold text-xl" style={{ color: '#3D1C1C' }}>{stat.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#8B5E5E' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
        <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: '#FFD0DC' }}>
          <h2 className="font-display font-bold text-lg" style={{ color: '#3D1C1C' }}>Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-xs font-medium" style={{ color: '#FF94AF' }}>View all →</Link>
        </div>
        <div className="divide-y" style={{ borderColor: '#FFE4D6' }}>
          {recentOrders.map(order => {
            const s = statusColors[order.status];
            return (
              <div key={order.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#3D1C1C' }}>{order.id}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#8B5E5E' }}>
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''} · ${order.total.toFixed(2)}
                  </p>
                  <p className="text-xs" style={{ color: '#8B5E5E' }}>{order.date}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: s.bg, color: s.text }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const OrdersPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-bold" style={{ color: '#3D1C1C' }}>My Orders</h1>
      {orders.map(order => {
        const s = statusColors[order.status];
        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'white', border: '1px solid #FFD0DC' }}
          >
            <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: '#FFE4D6' }}>
              <div>
                <p className="font-semibold" style={{ color: '#3D1C1C' }}>{order.id}</p>
                <p className="text-xs" style={{ color: '#8B5E5E' }}>{order.date} · {order.deliveryType === 'pickup' ? 'Pick up' : 'Delivery'}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-semibold block mb-1" style={{ background: s.bg, color: s.text }}>{s.label}</span>
                <p className="font-bold" style={{ color: '#3D1C1C' }}>${order.total.toFixed(2)}</p>
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-3">
              {order.items.map(item => (
                <div key={item.product.id} className="flex items-center gap-2">
                  <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#3D1C1C' }}>{item.product.name}</p>
                    <p className="text-xs" style={{ color: '#8B5E5E' }}>×{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            {order.estimatedTime && (
              <div className="px-4 pb-3 flex items-center gap-1.5 text-xs" style={{ color: '#8B5E5E' }}>
                <Clock size={12} style={{ color: '#FF94AF' }} /> Estimated: {order.estimatedTime}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export const FavouritesPage: React.FC = () => {
  const favProducts = products.filter(p => currentCustomer.favoriteProducts.includes(p.id));
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-bold" style={{ color: '#3D1C1C' }}>My Favourites</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {favProducts.map(p => (
          <Link key={p.id} to={`/products/${p.id}`}
            className="flex gap-3 p-4 rounded-2xl transition-all hover:shadow-card"
            style={{ background: 'white', border: '1px solid #FFD0DC' }}>
            <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: '#3D1C1C' }}>{p.name}</p>
              <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#8B5E5E' }}>{p.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-sm" style={{ color: '#FF94AF' }}>${p.price.toFixed(2)}</span>
                <div className="flex items-center gap-1">
                  <Star size={11} fill="#FFAA88" style={{ color: '#FFAA88' }} />
                  <span className="text-xs" style={{ color: '#8B5E5E' }}>{p.rating}</span>
                </div>
              </div>
            </div>
            <ChevronRight size={16} style={{ color: '#8B5E5E', flexShrink: 0 }} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export const AddressesPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl font-bold" style={{ color: '#3D1C1C' }}>Saved Addresses</h1>
        <button className="btn-primary text-sm px-4 py-2">+ Add Address</button>
      </div>
      {currentCustomer.addresses.map(addr => (
        <div key={addr.id} className="p-5 rounded-2xl relative" style={{ background: 'white', border: `2px solid ${addr.isDefault ? '#FF94AF' : '#FFD0DC'}` }}>
          {addr.isDefault && (
            <span className="absolute top-4 right-4 badge text-xs">Default</span>
          )}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFE4D6' }}>
              <MapPin size={16} style={{ color: '#FF94AF' }} />
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#3D1C1C' }}>{addr.label}</p>
              <p className="text-sm mt-1" style={{ color: '#8B5E5E' }}>{addr.street}</p>
              <p className="text-sm" style={{ color: '#8B5E5E' }}>{addr.city}, {addr.state} {addr.zip}</p>
              <div className="flex gap-3 mt-3">
                <button className="text-xs font-medium" style={{ color: '#FF94AF' }}>Edit</button>
                {!addr.isDefault && <button className="text-xs font-medium" style={{ color: '#8B5E5E' }}>Set as default</button>}
                {!addr.isDefault && <button className="text-xs font-medium" style={{ color: '#D91A4A' }}>Delete</button>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProfilePage: React.FC = () => {
  const [form, setForm] = useState({
    name: currentCustomer.name,
    email: currentCustomer.email,
    phone: currentCustomer.phone,
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold" style={{ color: '#3D1C1C' }}>Profile Settings</h1>
      <div className="p-6 rounded-2xl space-y-4" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
        <h2 className="font-display font-semibold text-lg" style={{ color: '#3D1C1C' }}>Personal Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Full Name</label>
            <input className="input-bakery" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Email</label>
            <input className="input-bakery" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>Phone</label>
            <input className="input-bakery" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>
        </div>
        <button className="btn-primary text-sm mt-2">Save Changes</button>
      </div>
      <div className="p-6 rounded-2xl space-y-4" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
        <h2 className="font-display font-semibold text-lg" style={{ color: '#3D1C1C' }}>Change Password</h2>
        {['Current Password', 'New Password', 'Confirm Password'].map(label => (
          <div key={label}>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D1C1C' }}>{label}</label>
            <input type="password" className="input-bakery" placeholder="••••••••" />
          </div>
        ))}
        <button className="btn-primary text-sm">Update Password</button>
      </div>
    </div>
  );
};
