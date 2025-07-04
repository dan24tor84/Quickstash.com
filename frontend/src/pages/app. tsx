import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomerOrderForm from './pages/CustomerOrderForm';
import AdminOrdersDashboard from './pages/AdminOrdersDashboard';
import VendorDashboard from './pages/VendorDashboard';
import CourierDashboard from './pages/CourierDashboard';
import ProductMenu from './pages/ProductMenu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerOrderForm />} />
        <Route path="/admin/orders" element={<AdminOrdersDashboard />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/courier/dashboard" element={<CourierDashboard />} />
        <Route path="/menu" element={<ProductMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
