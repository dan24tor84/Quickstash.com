import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import VendorSignup from './pages/VendorSignup';
import VendorDashboard from './pages/VendorDashboard';
import CourierDashboard from './pages/CourierDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProductMenu from './pages/ProductMenu';
import CustomerOrderForm from './pages/CustomerOrderForm';
import CheckoutPage from './pages/CheckoutPage'; // We'll create this next

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductMenu />} />
          <Route path="/order" element={<CustomerOrderForm />} />
          <Route path="/vendor/signup" element={<VendorSignup />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/courier/dashboard" element={<CourierDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
