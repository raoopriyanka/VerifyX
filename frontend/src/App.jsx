import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LandingPage from './pages/public/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ManufacturerDashboard from './pages/dashboard/ManufacturerDashboard';
import DistributorDashboard from './pages/dashboard/DistributorDashboard';
import DistributorVerifyQR from './pages/products/DistributorVerifyQR'; // 👈 Added QR verification page import
import AdminDashboard from './pages/dashboard/AdminDashboard';
import RegisterProduct from './pages/products/RegisterProduct';
import ProductTracking from './pages/products/ProductTracking';
import VerifyProduct from './pages/public/VerifyProduct';
import MyBatches from './pages/products/MyBatches';

function RoleBasedRedirect() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || 'manufacturer';
  return <Navigate to={`/dashboard/${role}`} replace />;
}

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
      <AuthProvider>
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

          {/* Dashboard & Product Routes Workspace */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<RoleBasedRedirect />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="manufacturer" element={<ManufacturerDashboard />} />
            <Route path="distributor" element={<DistributorDashboard />} />
            <Route path="verify-qr" element={<DistributorVerifyQR />} /> {/* 👈 Added QR verification route */}
            <Route path="retailer" element={<Placeholder title="Retailer Dashboard" />} />
            
            {/* Nested Product Management Routes */}
            <Route path="register-product" element={<RegisterProduct />} />
            <Route path="my-batches" element={<MyBatches />} />
            <Route path="traceability" element={<ProductTracking />} />
            <Route path="products/:id" element={<Placeholder title="Product Details" />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;