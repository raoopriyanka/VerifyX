import React, { useState } from 'react';
import { Search, QrCode, ShieldCheck, AlertOctagon, CheckCircle2, MapPin, Box } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import ProductTimeline from '../../components/shared/ProductTimeline';

// Reusing our mock timeline data for the successful state
const AUTHENTIC_DATA = {
  id: 'VX-8829-A1',
  name: 'High-Precision Sensor v2',
  manufacturer: 'VerifyX Corp Origin',
  registrationDate: '2026-08-15',
  status: 'Authentic',
  events: [
    { type: 'manufactured', status: 'completed', title: 'Product Minted & Registered', date: '2026-08-15 08:30 AM', txHash: '0x8f2a...3b91' },
    { type: 'transit', status: 'completed', title: 'Dispatched to Distributor', date: '2026-08-16 14:15 PM', txHash: '0x4c1d...7e22' },
    { type: 'received', status: 'completed', title: 'Arrival at Regional Hub', date: '2026-08-17 10:05 AM', txHash: '0x1a9b...4c88' },
    { type: 'sold', status: 'current', title: 'Retail Endpoint Authentication', date: '2026-08-17 12:30 PM', txHash: 'Pending...' }
  ]
};

export default function VerifyProduct() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null); // null | 'authentic' | 'counterfeit'

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsSearching(true);
    setResult(null);

    // Mock API Verification Delay
    setTimeout(() => {
      setIsSearching(false);
      // Simulate counterfeit if user types "fake", otherwise Authentic
      if (searchQuery.toLowerCase().includes('fake')) {
        setResult('counterfeit');
      } else {
        setResult('authentic');
      }
    }, 1200);
  };

  const handleScanQR = () => {
    // In Phase 2/3, this will open the device camera
    alert("Camera scanning will be implemented in a future phase. For now, please type an ID.");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Verification Header & Search */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-2xl mb-2 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Verify Product Authenticity</h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Enter the VerifyX ID found on your product's packaging or scan the QR code to check its cryptographic ledger history.
          </p>
        </div>

        <Card className="p-2 bg-white shadow-md border-slate-200/80 max-w-2xl mx-auto">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., VX-8829-A1 (Try typing 'fake' to see error)"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-base"
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={handleScanQR} className="px-4" aria-label="Scan QR">
                <QrCode className="w-5 h-5 text-slate-600" />
              </Button>
              <Button type="submit" isLoading={isSearching} className="px-8">
                Verify
              </Button>
            </div>
          </form>
        </Card>

        {/* --- RESULT STATES --- */}
        
        {/* Authentic State */}
        {result === 'authentic' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 text-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Authentic Product</h2>
              <p className="text-emerald-700 font-medium text-sm mb-8">
                This product's digital signature has been verified on the blockchain.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Product</p>
                  <p className="font-semibold text-slate-900 text-sm truncate">{AUTHENTIC_DATA.name}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Manufacturer</p>
                  <p className="font-semibold text-slate-900 text-sm truncate">{AUTHENTIC_DATA.manufacturer}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">VerifyX ID</p>
                  <p className="font-mono font-bold text-blue-600 text-sm truncate">{AUTHENTIC_DATA.id}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Provenance Ledger</h3>
              <ProductTimeline events={AUTHENTIC_DATA.events} />
            </Card>
          </div>
        )}

        {/* Counterfeit / Error State */}
        {result === 'counterfeit' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-rose-200 bg-rose-50 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
              <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-rose-200">
                <AlertOctagon className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Verification Failed</h2>
              <p className="text-rose-700 font-medium text-sm max-w-md mx-auto mb-6 leading-relaxed">
                We could not find a valid blockchain record for the ID <span className="font-mono bg-rose-100 px-1 rounded font-bold">{searchQuery}</span>. This may indicate a counterfeit product or an unregistered batch.
              </p>
              <Button variant="danger" onClick={() => setResult(null)}>Reset Scanner</Button>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}