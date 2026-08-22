import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // 1. Import AuthProvider

// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LandingPage from './pages/public/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ManufacturerDashboard from './pages/dashboard/ManufacturerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import RegisterProduct from './pages/products/RegisterProduct';
import ProductTracking from './pages/products/ProductTracking';
import VerifyProduct from './pages/public/VerifyProduct';

// Temporary Placeholders for upcoming steps
const Placeholder = ({ title }) => (
  <div className="p-8 border-2 border-dashed border-slate-300 rounded-xl text-center text-slate-500 mt-8">
    <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
    <p>This page is scheduled for the next development phase.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* 2. Wrap your app inside AuthProvider */}
        <Routes>
           {/* Public Routes (Navbar & Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/verify" element={<VerifyProduct />} />
          </Route>

          {/* Authentication Routes (Split Screen) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Dashboard Routes (Sidebar & Topbar) */}
          <Route path="/dashboard" element={<DashboardLayout role="manufacturer" />}>
            <Route index element={<Navigate to="manufacturer" replace />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="manufacturer" element={<ManufacturerDashboard />} />
            <Route path="distributor" element={<Placeholder title="Distributor Dashboard" />} />
            <Route path="retailer" element={<Placeholder title="Retailer Dashboard" />} />
          </Route>

          {/* Product Tracking Routes (Inside Dashboard) */}
          <Route path="/products" element={<DashboardLayout role="manufacturer" />}>
            <Route path="register" element={<RegisterProduct />} />
            <Route path="tracking" element={<ProductTracking />} />
            <Route path=":id" element={<Placeholder title="Product Details" />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;