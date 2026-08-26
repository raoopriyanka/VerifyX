import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ShieldCheck, ArrowRight, Plus } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function ManufacturerDashboard() {
  const [stats, setStats] = useState({ totalUnits: 0, inTransit: 0, verified: 0 });
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Wrap in useCallback so it can be safely referenced
  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await API.get('/products/manufacturer');
      const products = response.data.data || [];

      setRecentProducts(products.slice(0, 5));

      const total = products.length;
      const transit = products.filter(p => p.status === 'IN_TRANSIT').length;
      const verified = products.filter(p => p.status === 'VERIFIED' || p.verifiedCount > 0).length;

      setStats({
        totalUnits: total,
        inTransit: transit,
        verified: verified
      });
    } catch (err) {
      console.error('Failed to fetch manufacturer dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount, and re-fetch if window regains focus (e.g., coming back from the register page)
  useEffect(() => {
    fetchDashboardData();
    
    window.addEventListener('focus', fetchDashboardData);
    return () => window.removeEventListener('focus', fetchDashboardData);
  }, [fetchDashboardData]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Manufacturer Workspace" 
          description="Manage your registered products and monitor supply-chain nodes in real-time."
        />
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={fetchDashboardData} className="bg-white">
            Refresh Data
          </Button>
          <Link to="/dashboard/register-product">
            <Button icon={Plus}>Register New Product</Button>
          </Link>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Total Registered Units</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{isLoading ? '...' : stats.totalUnits}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Units In Transit</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{isLoading ? '...' : stats.inTransit}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Successfully Verified</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{isLoading ? '...' : stats.verified}</p>
          </div>
        </Card>
      </div>

      {/* Recent Product Registrations Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Recent Product Registrations</h3>
          <Link to="/dashboard/my-batches" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-4">Product ID</th>
                <th className="pb-3 px-4">Product Name</th>
                <th className="pb-3 px-4">Category</th>
                <th className="pb-3 px-4">Current Status</th>
                <th className="pb-3 px-4">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400">Loading your supply-chain nodes...</td>
                </tr>
              ) : recentProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400">No products registered yet. Click "Register New Product" to start.</td>
                </tr>
              ) : (
                recentProducts.map((product) => (
                  <tr key={product.productId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-mono font-medium text-blue-600">{product.productId}</td>
                    <td className="py-4 px-4 font-semibold text-slate-900">{product.name}</td>
                    <td className="py-4 px-4 text-slate-600 capitalize">{product.category}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {product.status || 'MANUFACTURED'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {new Date(product.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}