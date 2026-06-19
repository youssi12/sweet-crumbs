import React from 'react';
import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { HomePage } from './components/home/HomePage';
import { AboutPage } from './components/home/AboutPage';
import { ContactPage } from './components/home/ContactPage';
import { ProductsPage } from './components/products/ProductsPage';
import { ProductDetailPage } from './components/products/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import {
  DashboardLayout, DashboardOverview, OrdersPage,
  FavouritesPage, AddressesPage, ProfilePage
} from './components/dashboard/CustomerDashboard';
import {
  AdminLayout, AdminDashboard, AdminOrdersPage,
  AdminProductsPage, AdminCustomersPage, AdminAnalyticsPage
} from './components/admin/AdminDashboard';

// Scroll to top on navigation
function ScrollToTop() {
  return null;
}

// Public layout (with Navbar and Footer)
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <CartDrawer />
    <main>{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><ProductsPage /></PublicLayout>} />
          <Route path="/products/:id" element={<PublicLayout><ProductDetailPage /></PublicLayout>} />
          <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />
          <Route path="/checkout" element={<PublicLayout><CheckoutPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

          {/* Customer Dashboard */}
          <Route path="/dashboard" element={<PublicLayout><DashboardLayout /></PublicLayout>}>
            <Route index element={<DashboardOverview />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="favorites" element={<FavouritesPage />} />
            <Route path="addresses" element={<AddressesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Dashboard (no navbar/footer) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
