import React, { useState } from 'react';
import { Search, QrCode, ShieldCheck, AlertOctagon, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProductTimeline from '../../components/shared/ProductTimeline';
import API from '../../services/api';

export default function VerifyProduct() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null); // null | data object
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    const cleanId = searchQuery.trim();
    if (!cleanId) return;
    
    setIsSearching(true);
    setVerificationResult(null);
    setErrorMessage('');

    try {
      // Public backend call (no token required)
      const response = await API.get(`/verify/${cleanId}`);
      const data = response.data.data;
      setVerificationResult(data);
    } catch (err) {
      setVerificationResult({
        found: false,
        verificationStatus: 'NOT_FOUND',
        message: err.response?.data?.message || 'Product record not found.'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleScanQR = () => {
    alert("Camera scanning will be implemented in a future phase. For now, please type a valid VerifyX ID (e.g., VX-2026-E399F5).");
  };

  const status = verificationResult?.verificationStatus;

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
            Enter the VerifyX ID found on your product's packaging or scan the QR code to check its immutable ledger history.
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
                placeholder="e.g., VX-2026-E399F5" 
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
        {verificationResult && verificationResult.found && status === 'AUTHENTIC' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 text-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Authentic Product</h2>
              <p className="text-emerald-700 font-medium text-sm mb-6">
                {verificationResult.message}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-6">
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Product</p>
                  <p className="font-semibold text-slate-900 text-sm truncate">{verificationResult.product.name}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Manufacturer</p>
                  <p className="font-semibold text-slate-900 text-sm truncate">{verificationResult.product.manufacturer?.name || 'VerifyX Origin'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">VerifyX ID</p>
                  <p className="font-mono font-bold text-blue-600 text-sm truncate">{verificationResult.product.productId}</p>
                </div>
              </div>

              {/* Blockchain Ledger Proof Card */}
              {verificationResult.blockchain && (
                <div className="bg-white border border-emerald-200 rounded-xl p-4 text-left space-y-2">
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wide">
                    ⛓️ Immutable Blockchain Proof
                  </div>
                  <div className="text-xs space-y-1 font-mono text-slate-600 break-all">
                    <div><span className="font-sans font-semibold text-slate-700">Transaction Hash:</span> {verificationResult.blockchain.transactionHash}</div>
                    <div><span className="font-sans font-semibold text-slate-700">Contract Address:</span> {verificationResult.blockchain.contractAddress}</div>
                    <div><span className="font-sans font-semibold text-slate-700">On-Chain Registered:</span> {verificationResult.blockchain.registeredAt ? new Date(Number(verificationResult.blockchain.registeredAt) * 1000).toLocaleString() : 'N/A'}</div>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Provenance Audit Trail</h3>
              <ProductTimeline 
                events={verificationResult.timeline.map((e, idx, arr) => ({
                  type: e.eventType.toLowerCase(),
                  title: e.eventType,
                  description: e.notes || `Product status updated to ${e.eventType}`,
                  date: new Date(e.timestamp).toLocaleString(),
                  status: idx === arr.length - 1 ? 'current' : 'completed',
                  txHash: e.blockchainTransactionHash || null,
                  location: e.location
                }))} 
              />
            </Card>
          </div>
        )}

        {/* Potential Counterfeit State */}
        {verificationResult && verificationResult.found && status === 'POTENTIAL_COUNTERFEIT' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-rose-200 bg-rose-50 p-8 text-center relative overflow-hidden space-y-4">
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
              <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-rose-200">
                <AlertOctagon className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Security Alert: Counterfeit Warning</h2>
              <p className="text-rose-700 font-medium text-sm max-w-md mx-auto leading-relaxed">
                {verificationResult.message}
              </p>
              <Button variant="danger" onClick={() => { setVerificationResult(null); setSearchQuery(''); }}>Reset Scanner</Button>
            </Card>
          </div>
        )}

        {/* Blockchain Pending State */}
        {verificationResult && verificationResult.found && status === 'BLOCKCHAIN_PENDING' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-amber-200 bg-amber-50 p-8 text-center relative overflow-hidden space-y-4">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-amber-200">
                <Clock className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Verification Pending</h2>
              <p className="text-amber-700 font-medium text-sm max-w-md mx-auto leading-relaxed">
                {verificationResult.message}
              </p>
              <Button variant="secondary" onClick={() => { setVerificationResult(null); setSearchQuery(''); }}>Try Again</Button>
            </Card>
          </div>
        )}

        {/* Flagged State */}
        {verificationResult && verificationResult.found && status === 'FLAGGED' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-red-200 bg-red-50 p-8 text-center relative overflow-hidden space-y-4">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-red-200">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Product Flagged</h2>
              <p className="text-red-700 font-medium text-sm max-w-md mx-auto leading-relaxed">
                {verificationResult.message}
              </p>
              <Button variant="danger" onClick={() => { setVerificationResult(null); setSearchQuery(''); }}>Reset Scanner</Button>
            </Card>
          </div>
        )}

        {/* Not Found / Error State */}
        {verificationResult && (!verificationResult.found || status === 'NOT_FOUND') && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Card className="border-rose-200 bg-rose-50 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
              <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-rose-200">
                <AlertOctagon className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Verification Failed</h2>
              <p className="text-rose-700 font-medium text-sm max-w-md mx-auto mb-6 leading-relaxed">
                We could not find a valid record for the ID <span className="font-mono bg-rose-100 px-1 rounded font-bold">{searchQuery}</span>. This may indicate a counterfeit product or an invalid identifier.
              </p>
              <Button variant="danger" onClick={() => { setVerificationResult(null); setSearchQuery(''); }}>Reset Scanner</Button>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}