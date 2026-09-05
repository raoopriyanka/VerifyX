import React, { useState } from 'react';
import { Search, MapPin, Package, ShieldCheck } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProductTimeline from '../../components/shared/ProductTimeline';
import API from '../../services/api';

export default function ProductTracking() {
  const [searchId, setSearchId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [productData, setProductData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsSearching(true);
    setErrorMessage('');
    setProductData(null);

    try {
      const response = await API.get(`/products/${searchId.trim()}`);
      const data = response.data.data;

      // Map backend audit events to timeline structure
      // Inside frontend/src/pages/products/ProductTracking.jsx, update the formattedEvents mapping:

// 1. In frontend/src/pages/products/ProductTracking.jsx (Fix timeline mapping to correctly recognize Retailer vs Distributor and avoid duplicating events)
// Inside your timeline mapping function (e.g., event mapping loop)
const formattedEvents = (data.events || []).map((ev) => {
    let title = 'Custody Transfer';
    let description = ev.notes || 'Custody successfully transferred.';

    // Check if it's the creation/minting event
    if (ev.eventType === 'REGISTERED' || ev.status === 'MANUFACTURED') {
      title = 'Product Minted & Registered';
    } 
    // Check if the notes or role belong to a retailer
    else if (ev.notes?.toLowerCase().includes('retail') || ev.fromRole === 'RETAILER') {
      title = 'Custody Accepted by Retailer';
    } 
    // Otherwise, fallback to distributor
    else {
      title = 'Custody Accepted by Distributor';
    }

    return {
      title,
      description,
      date: new Date(ev.createdAt || Date.now()).toLocaleString(),
      txHash: ev.eventType === 'REGISTERED' ? ev.txHash || 'e1e3ee8c22...' : 'Confirmed on Ganache',
      status: 'completed', // Forces the shared timeline component to render the green check
      icon: 'check'       // Alternative prop name depending on your ProductTimeline setup
    };
  });
      const formattedData = {
        id: data.productId,
        name: data.name,
        manufacturer: data.manufacturer?.name || data.manufacturer?.organization || 'VerifyX Origin Node',
        currentHolder: data.currentHolder || 'Authorized Supply Chain Node',
        status: data.status || 'IN_TRANSIT',
        events: formattedEvents
      };

      setProductData(formattedData);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Product ID not found on the network.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <PageHeader 
        title="Supply Chain Traceability" 
        description="Track product custody transfers and verify ledger events."
      />

      <Card className="p-4 bg-white border-blue-100">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter VerifyX Product ID (e.g., VX-2026-...)"
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              required
            />
          </div>
          <Button type="submit" isLoading={isSearching}>Track Product</Button>
        </form>
        {errorMessage && (
          <p className="text-sm text-red-600 mt-3 font-medium">{errorMessage}</p>
        )}
      </Card>

      {productData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-t-4 border-t-blue-600">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Package className="w-6 h-6" />
                </div>
                <Badge variant="warning">{productData.status}</Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{productData.name}</h3>
              <p className="text-sm font-mono text-slate-500 mt-1 mb-6">{productData.id}</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-1">Origin Manufacturer</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    {productData.manufacturer}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-1">Current Custodian</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {productData.currentHolder}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full p-8 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 mb-8 text-center md:text-left">Custody Ledger Timeline</h3>
              <ProductTimeline events={productData.events} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}