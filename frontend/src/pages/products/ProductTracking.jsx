import React, { useState } from 'react';
import { Search, MapPin, Package, ShieldCheck } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import ProductTimeline from '../../components/shared/ProductTimeline';

// Mock Tracking Data
const MOCK_TRACKING_DATA = {
  id: 'VX-8829-A1',
  name: 'High-Precision Sensor v2',
  manufacturer: 'VerifyX Corp Origin',
  currentHolder: 'Distributor_North_Transit',
  status: 'In Transit',
  events: [
    {
      type: 'manufactured',
      status: 'completed',
      title: 'Product Minted & Registered',
      description: 'Digital identity created on the blockchain by Origin Node.',
      date: '2026-08-15 08:30 AM',
      txHash: '0x8f2a...3b91'
    },
    {
      type: 'transit',
      status: 'completed',
      title: 'Dispatched to Distributor',
      description: 'Custody successfully transferred to transit logistics.',
      date: '2026-08-16 14:15 PM',
      txHash: '0x4c1d...7e22'
    },
    {
      type: 'received',
      status: 'current',
      title: 'Arrival at Regional Hub',
      description: 'Currently scanning into Distributor_North inventory.',
      date: '2026-08-17 10:05 AM',
      txHash: 'Pending Confirmation...'
    },
    {
      type: 'sold',
      status: 'pending',
      title: 'Retail Endpoint Authentication',
      description: 'Awaiting final transfer to customer.',
      date: null,
      txHash: null
    }
  ]
};

export default function ProductTracking() {
  const [searchId, setSearchId] = useState('VX-8829-A1');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <PageHeader 
        title="Supply Chain Traceability" 
        description="Track product custody transfers and verify ledger events."
      />

      {/* Search Bar */}
      <Card className="p-4 bg-white border-blue-100">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter VerifyX Product ID..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <Button type="submit" isLoading={isSearching}>Track Product</Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Product Details Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-t-4 border-t-blue-600">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Package className="w-6 h-6" />
              </div>
              <Badge variant="warning">{MOCK_TRACKING_DATA.status}</Badge>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{MOCK_TRACKING_DATA.name}</h3>
            <p className="text-sm font-mono text-slate-500 mt-1 mb-6">{MOCK_TRACKING_DATA.id}</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-1">Origin Manufacturer</p>
                <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  {MOCK_TRACKING_DATA.manufacturer}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-1">Current Custodian</p>
                <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {MOCK_TRACKING_DATA.currentHolder}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline View */}
        <div className="lg:col-span-2">
          <Card className="h-full p-8 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900 mb-8 text-center md:text-left">Custody Ledger Timeline</h3>
            <ProductTimeline events={MOCK_TRACKING_DATA.events} />
          </Card>
        </div>

      </div>
    </div>
  );
}