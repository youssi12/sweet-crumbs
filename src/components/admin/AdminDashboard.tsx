import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, Users, Package, TrendingUp, TrendingDown,
  Plus, Edit2, Trash2, Search, ChevronLeft, BarChart2, Menu, X
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import {
  adminStats, revenueData, popularProducts, adminOrders, adminCustomers, products
} from '../../data/mockData';

const statusColors: Record<string, { bg: string; text: string }> = {
  pending:   { bg: '#FFF3EE', text: '#F5673A' },
  preparing: { bg: '#FFF8E0', text: '#D97706' },
  ready:     { bg: '#E8F5E9', text: '#2E7D32' },
  delivered: { bg: '#F3E5F5', text: '#7B1FA2' },
  cancelled: { bg: '#FFEBEE', text: '#C62828' },
};

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard, end: true },
    { to: '/admin/orders', label: 'Orders', Icon: ShoppingBag },
    { to: '/admin/products', label: 'Products', Icon: Package },
    { to: '/admin/customers', label: 'Customers', Icon: Users },
    { to: '/admin/analytics', label: 'Analytics', Icon: BarChart2 },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#FFF8F0' }}>
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-16'}`}
        style={{ background: '#3D1C1C', minHeight: '100vh' }}
      >
        <div className={`flex items-center gap-2 p-4 border-b ${sidebarOpen ? '' : 'justify-center'}`}
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}>
            <span className="text-sm">🍰</span>
          </div>
          {sidebarOpen && <span className="font-display font-bold text-white text-sm">Admin Panel</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${!sidebarOpen ? 'justify-center' : ''}`
              }
              style={({ isActive }) => isActive
                ? { background: 'rgba(255,148,175,0.25)', color: '#FF94AF' }
                : { color: 'rgba(255,255,255,0.6)' }
              }
              title={!sidebarOpen ? label : undefined}
            >
              <Icon size={18} />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}
            style={{ color: 'rgba(255,255,255,0.5)' }}
            title="Back to site"
          >
            <ChevronLeft size={16} />
            {sidebarOpen && 'Back to Site'}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ background: 'white', borderColor: '#FFD0DC' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(o => !o)} className="p-1.5 rounded-lg hover:bg-rose-50 transition-colors">
              <Menu size={18} style={{ color: '#8B5E5E' }} />
            </button>
            <h1 className="font-display font-bold text-lg" style={{ color: '#3D1C1C' }}>Sweet Crumbs Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: '#8B5E5E' }}>Today: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}>A</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: `$${(adminStats.totalRevenue / 1000).toFixed(1)}k`, growth: adminStats.revenueGrowth, emoji: '💰' },
    { label: 'Total Orders', value: adminStats.totalOrders.toLocaleString(), growth: adminStats.ordersGrowth, emoji: '📦' },
    { label: 'Customers', value: adminStats.totalCustomers.toLocaleString(), growth: adminStats.customersGrowth, emoji: '👥' },
    { label: 'Avg Order Value', value: `$${adminStats.avgOrderValue.toFixed(2)}`, growth: adminStats.avgOrderGrowth, emoji: '🎯' },
  ];

  const PEACH = '#FFAA88';
  const ROSE = '#FF94AF';

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl"
            style={{ background: 'white', border: '1px solid #FFD0DC' }}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-2xl">{s.emoji}</span>
              <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${s.growth > 0 ? '' : ''}`}
                style={s.growth > 0 ? { background: '#E8F5E9', color: '#2E7D32' } : { background: '#FFEBEE', color: '#C62828' }}>
                {s.growth > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {Math.abs(s.growth)}%
              </span>
            </div>
            <p className="font-display font-bold text-2xl" style={{ color: '#3D1C1C' }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: '#8B5E5E' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 p-5 rounded-2xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
          <h2 className="font-display font-bold text-lg mb-5" style={{ color: '#3D1C1C' }}>Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={ROSE} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={ROSE} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFE4D6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8B5E5E' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8B5E5E' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: 'white', border: '1px solid #FFD0DC', borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke={ROSE} strokeWidth={2.5} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Products */}
        <div className="p-5 rounded-2xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
          <h2 className="font-display font-bold text-lg mb-5" style={{ color: '#3D1C1C' }}>Top Products</h2>
          <div className="space-y-3">
            {popularProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: i === 0 ? '#F5673A' : i === 1 ? '#FF94AF' : '#FFAA88' }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: '#3D1C1C' }}>{p.name}</p>
                  <div className="flex justify-between text-xs mt-0.5" style={{ color: '#8B5E5E' }}>
                    <span>{p.sales} sold</span>
                    <span className="text-green-600">+{p.growth}%</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: '#FFE4D6' }}>
                    <div className="h-full rounded-full" style={{ width: `${(p.sales / popularProducts[0].sales) * 100}%`, background: 'linear-gradient(90deg, #FF94AF, #FFAA88)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
        <div className="flex justify-between items-center p-5 border-b" style={{ borderColor: '#FFE4D6' }}>
          <h2 className="font-display font-bold text-lg" style={{ color: '#3D1C1C' }}>Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs font-medium" style={{ color: '#FF94AF' }}>View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #FFE4D6' }}>
                {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Time'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: '#8B5E5E' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminOrders.map(order => {
                const s = statusColors[order.status];
                return (
                  <tr key={order.id} className="border-b hover:bg-rose-50/30 transition-colors" style={{ borderColor: '#FFE4D6' }}>
                    <td className="px-5 py-3 text-sm font-semibold" style={{ color: '#3D1C1C' }}>{order.id}</td>
                    <td className="px-5 py-3 text-sm" style={{ color: '#3D1C1C' }}>{order.customer}</td>
                    <td className="px-5 py-3 text-sm" style={{ color: '#8B5E5E' }}>{order.items}</td>
                    <td className="px-5 py-3 text-sm font-semibold" style={{ color: '#3D1C1C' }}>${order.total.toFixed(2)}</td>
                    <td className="px-5 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{ background: s.bg, color: s.text }}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ color: '#8B5E5E' }}>{order.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminOrdersPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const statuses = ['all', 'pending', 'preparing', 'ready', 'delivered'];
  const filtered = filter === 'all' ? adminOrders : adminOrders.filter(o => o.status === filter);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-bold" style={{ color: '#3D1C1C' }}>Orders</h1>

      <div className="flex flex-wrap gap-2">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200"
            style={filter === s
              ? { background: 'linear-gradient(135deg, #FF94AF, #FFAA88)', color: 'white' }
              : { background: 'white', color: '#8B5E5E', border: '1px solid #FFD0DC' }
            }>
            {s === 'all' ? 'All Orders' : s}
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #FFE4D6', background: '#FFF8F0' }}>
              {['Order', 'Customer', 'Items', 'Total', 'Status', 'Time', 'Action'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: '#8B5E5E' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(order => {
              const s = statusColors[order.status];
              return (
                <tr key={order.id} className="border-b hover:bg-rose-50/20 transition-colors" style={{ borderColor: '#FFE4D6' }}>
                  <td className="px-5 py-3 text-sm font-semibold" style={{ color: '#3D1C1C' }}>{order.id}</td>
                  <td className="px-5 py-3 text-sm" style={{ color: '#3D1C1C' }}>{order.customer}</td>
                  <td className="px-5 py-3 text-sm" style={{ color: '#8B5E5E' }}>{order.items}</td>
                  <td className="px-5 py-3 text-sm font-semibold" style={{ color: '#3D1C1C' }}>${order.total.toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <select className="text-xs px-2 py-1 rounded-full font-semibold border-0 outline-none cursor-pointer"
                      style={{ background: s.bg, color: s.text }}
                      defaultValue={order.status}>
                      {['pending','preparing','ready','delivered','cancelled'].map(v => (
                        <option key={v} value={v} className="bg-white text-gray-800">{v}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: '#8B5E5E' }}>{order.time}</td>
                  <td className="px-5 py-3">
                    <button className="text-xs px-3 py-1 rounded-lg font-medium" style={{ background: '#FFE4D6', color: '#8B5E5E' }}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AdminProductsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <h1 className="font-display text-3xl font-bold" style={{ color: '#3D1C1C' }}>Products</h1>
        <button className="btn-primary text-sm w-fit flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8B5E5E' }} />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-bakery pl-10"
        />
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #FFE4D6', background: '#FFF8F0' }}>
              {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: '#8B5E5E' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b hover:bg-rose-50/20 transition-colors" style={{ borderColor: '#FFE4D6' }}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <span className="text-sm font-medium" style={{ color: '#3D1C1C' }}>{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs capitalize" style={{ background: '#FFE4D6', color: '#8B5E5E' }}>{p.category}</span>
                </td>
                <td className="px-5 py-3 text-sm font-semibold" style={{ color: '#3D1C1C' }}>${p.price.toFixed(2)}</td>
                <td className="px-5 py-3">
                  <span className={`text-sm font-semibold ${p.stock <= 5 ? 'text-red-500' : p.stock <= 10 ? 'text-amber-500' : 'text-green-600'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm" style={{ color: '#8B5E5E' }}>⭐ {p.rating}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg transition-colors hover:bg-rose-100" title="Edit">
                      <Edit2 size={14} style={{ color: '#FF94AF' }} />
                    </button>
                    <button className="p-1.5 rounded-lg transition-colors hover:bg-red-100" title="Delete">
                      <Trash2 size={14} style={{ color: '#D91A4A' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AdminCustomersPage: React.FC = () => {
  const customerBadge = (status: string) => {
    const map: Record<string, { bg: string; text: string }> = {
      vip:     { bg: '#FFF3EE', text: '#F5673A' },
      regular: { bg: '#E8F5E9', text: '#2E7D32' },
      new:     { bg: '#E3F2FD', text: '#1565C0' },
    };
    return map[status] || map.regular;
  };

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-bold" style={{ color: '#3D1C1C' }}>Customers</h1>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Customers', value: '892', emoji: '👥' },
          { label: 'VIP Members', value: '127', emoji: '⭐' },
          { label: 'New This Month', value: '48', emoji: '🆕' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="font-bold text-xl" style={{ color: '#3D1C1C' }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#8B5E5E' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #FFE4D6', background: '#FFF8F0' }}>
              {['Customer', 'Email', 'Orders', 'Spent', 'Joined', 'Status'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: '#8B5E5E' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adminCustomers.map(c => {
              const badge = customerBadge(c.status);
              return (
                <tr key={c.id} className="border-b hover:bg-rose-50/20 transition-colors" style={{ borderColor: '#FFE4D6' }}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #FF94AF, #FFAA88)' }}>
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#3D1C1C' }}>{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm" style={{ color: '#8B5E5E' }}>{c.email}</td>
                  <td className="px-5 py-3 text-sm font-semibold" style={{ color: '#3D1C1C' }}>{c.orders}</td>
                  <td className="px-5 py-3 text-sm font-semibold" style={{ color: '#3D1C1C' }}>${c.spent.toFixed(2)}</td>
                  <td className="px-5 py-3 text-xs" style={{ color: '#8B5E5E' }}>{c.joined}</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={{ background: badge.bg, color: badge.text }}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AdminAnalyticsPage: React.FC = () => {
  const COLORS = ['#FF94AF', '#FFAA88', '#F5673A', '#D8AAFF', '#FFD0DC'];
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold" style={{ color: '#3D1C1C' }}>Analytics</h1>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
          <h2 className="font-display font-bold text-lg mb-5" style={{ color: '#3D1C1C' }}>Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFE4D6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8B5E5E' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8B5E5E' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip contentStyle={{ background: 'white', border: '1px solid #FFD0DC', borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {revenueData.map((_, i) => <Cell key={i} fill={i === revenueData.length - 1 ? '#FF94AF' : '#FFCAB4'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 rounded-2xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
          <h2 className="font-display font-bold text-lg mb-5" style={{ color: '#3D1C1C' }}>Orders Volume</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFAA88" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FFAA88" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFE4D6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8B5E5E' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8B5E5E' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'white', border: '1px solid #FFD0DC', borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="orders" stroke="#FFAA88" strokeWidth={2.5} fill="url(#ordersGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-5 rounded-2xl" style={{ background: 'white', border: '1px solid #FFD0DC' }}>
        <h2 className="font-display font-bold text-lg mb-5" style={{ color: '#3D1C1C' }}>Product Sales Breakdown</h2>
        <div className="space-y-4">
          {popularProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-4">
              <span className="text-sm font-medium w-44 truncate" style={{ color: '#3D1C1C' }}>{p.name}</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: '#FFE4D6' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(p.sales / popularProducts[0].sales) * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
              </div>
              <div className="text-right min-w-[80px]">
                <span className="text-sm font-bold" style={{ color: '#3D1C1C' }}>{p.sales}</span>
                <span className="text-xs ml-1" style={{ color: '#8B5E5E' }}>sold</span>
              </div>
              <span className="text-xs font-semibold text-green-600 min-w-[45px] text-right">+{p.growth}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
