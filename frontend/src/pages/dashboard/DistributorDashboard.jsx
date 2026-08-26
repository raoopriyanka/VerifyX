import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, ArrowRight, RefreshCw, AlertCircle, Search, Filter } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function DistributorDashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchDistributorData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await API.get('/products');
      setProducts(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch distributor data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDistributorData();
  }, [fetchDistributorData]);

  const handleUpdateStatus = async (productId, newStatus, noteText) => {
    try {
      setActionLoadingId(productId);
      setFeedback({ message: '', type: '' });

      await API.patch(`/products/${productId}/transfer`, {
        status: newStatus,
        notes: noteText
      });

      setFeedback({
        message: `Product ${productId} status updated to ${newStatus} successfully!`,
        type: 'success'
      });

      await fetchDistributorData();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update shipment status.';
      setFeedback({ message: msg, type: 'error' });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filter products based on search query and status dropdown
  const filteredProducts = products.filter((item) => {
    const matchesSearch = 
      item.productId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batchNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'ALL' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Compute live metrics from full dataset
  const totalHandled = products.length;
  const inTransit = products.filter((p) => p.status === 'IN_TRANSIT').length;
  const readyForPickup = products.filter((p) => p.status === 'MANUFACTURED').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Distributor Logistics Portal" 
          description="Verify incoming shipments, accept custody transfers, and update supply-chain states."
        />
        <Button variant="outline" onClick={fetchDistributorData} className="bg-white" icon={RefreshCw}>
          Refresh Logistics
        </Button>
      </div>

      {feedback.message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm flex items-center gap-2 border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
          {feedback.message}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Total Inventory Nodes</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{isLoading ? '...' : totalHandled}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Units In Transit</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{isLoading ? '...' : inTransit}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Awaiting Intake</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{isLoading ? '...' : readyForPickup}</p>
          </div>
        </Card>
      </div>

      {/* Search & Filter Controls */}
      <Card className="p-4 bg-white">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Product ID, Name, or Batch Number..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="MANUFACTURED">Manufactured (Awaiting Intake)</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Shipments Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Incoming & Active Shipments ({filteredProducts.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-4">Product ID</th>
                <th className="pb-3 px-4">Product Name</th>
                <th className="pb-3 px-4">Batch / Lot</th>
                <th className="pb-3 px-4">Current Holder</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4 text-right">Custody Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-slate-400">
                    Loading logistics feed...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-slate-400">
                    No matching products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => {
                  return (
                    <tr key={item.productId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-mono font-medium text-blue-600">
                        {item.productId}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        {item.name}
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-slate-600">
                        {item.batchNumber || 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-slate-700">
                        {item.currentHolder || 'Manufacturer Node'}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'IN_TRANSIT'
                              ? 'bg-amber-50 text-amber-700'
                              : item.status === 'DELIVERED'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {item.status || 'MANUFACTURED'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        {item.status === 'MANUFACTURED' ? (
                          <Button
                            size="sm"
                            isLoading={actionLoadingId === item.productId}
                            onClick={() => handleUpdateStatus(item.productId, 'IN_TRANSIT', 'Custody accepted by distributor node.')}
                          >
                            Accept Custody
                          </Button>
                        ) : item.status === 'IN_TRANSIT' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            isLoading={actionLoadingId === item.productId}
                            onClick={() => handleUpdateStatus(item.productId, 'DELIVERED', 'Dispatched to retail network / final delivery.')}
                          >
                            Dispatch to Retailer
                          </Button>
                        ) : (
                          <Link
                            to={`/dashboard/traceability?id=${item.productId}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                          >
                            Trace Flow <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}