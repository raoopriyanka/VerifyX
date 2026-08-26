import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Plus, ExternalLink, Filter } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function MyBatches() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const res = await API.get('/products/manufacturer');
        setProducts(res.data.data || []);
      } catch (err) {
        console.error('Error loading batches:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.productId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.batchNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'ALL' ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Batch & Inventory Management"
          description={`Viewing all ${products.length} registered products and active manufacturing batches.`}
        />
        <Link to="/dashboard/register-product">
          <Button icon={Plus}>Register New Product</Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 bg-white">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Product Name, ID, or Batch Number..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
            >
              <option value="ALL">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="pharmaceuticals">Pharmaceuticals</option>
              <option value="luxury">Luxury Goods</option>
              <option value="machinery">Machinery</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Full Batches Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-4">Product ID</th>
                <th className="pb-3 px-4">Product Name</th>
                <th className="pb-3 px-4">Batch / Lot</th>
                <th className="pb-3 px-4">Category</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4">Registered Date</th>
                <th className="pb-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    Loading inventory records...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No matching products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.productId} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 font-mono font-medium text-blue-600">
                      {product.productId}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {product.name}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-600 text-xs">
                      {product.batchNumber || 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-slate-600 capitalize">
                      {product.category}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {product.status || 'MANUFACTURED'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {new Date(product.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to={`/dashboard/traceability?id=${product.productId}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Track <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
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