import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Placeholder Pages (To be built in Phase 2)
const Landing = () => <div>Landing Page</div>;
const Login = () => <div>Login Page</div>;
const Register = () => <div>Register Page</div>;
const ManufacturerDashboard = () => <div>Manufacturer Dashboard</div>;
const CustomerDashboard = () => <div>Customer Dashboard</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;
const ProductDetails = () => <div>Product Details</div>;
const ScanQR = () => <div>Scan QR</div>;
const VerifyProduct = () => <div>Verify Product</div>;
const TransferOwnership = () => <div>Transfer Ownership</div>;
const Analytics = () => <div>Analytics</div>;
const About = () => <div>About</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-gray-900 font-sans">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/manufacturer" element={<ManufacturerDashboard />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/product/:uuid" element={<ProductDetails />} />
          <Route path="/scan" element={<ScanQR />} />
          <Route path="/verify" element={<VerifyProduct />} />
          <Route path="/transfer" element={<TransferOwnership />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;