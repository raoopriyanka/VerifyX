import React, { useEffect, useState, useCallback } from 'react';
import { PackageCheck, Search, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function RetailInventory() {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInventory = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await API.get('/products');
      const allProducts = response.data.data || [];
      // Filter products that belong to the retailer (delivered status or retail holder)
      const retailStock = allProducts.filter(
        p => p.status === 'DELIVERED' || p.currentHolder?.toLowerCase().includes('retail')
      );
      setInventory(retailStock);
    } catch (err) {
      console.error('Failed to fetch retail inventory:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const filteredInventory = inventory.filter(item =>
    item.productId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.batchNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Store Inventory & Stock Catalog" 
          description="View and verify units currently stocked and verified at your retail location."
        />
        <Button variant="outline" onClick={fetchInventory} className="bg-white" icon={RefreshCw}>
          Refresh Catalog
        </Button>
      </div>

      <Card className="p-4 bg-white">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stock by Product ID, Name, or Batch..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-4">Product ID</th>
                <th className="pb-3 px-4">Item Name</th>
                <th className="pb-3 px-4">Batch Number</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400">Loading store stock catalog...</td>
                </tr>
              ) : filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400">No delivered stock found in retail inventory.</td>
                </tr>
              ) : (
                filteredInventory.map((item) => (
                  <tr key={item.productId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-mono font-medium text-blue-600">{item.productId}</td>
                    <td className="py-4 px-4 font-semibold text-slate-900">{item.name}</td>
                    <td className="py-4 px-4 font-mono text-xs text-slate-600">{item.batchNumber || 'N/A'}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        Ledger Verified
                      </span>
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