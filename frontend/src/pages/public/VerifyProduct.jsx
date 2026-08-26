import React, { useState } from 'react';
import { Search, ShieldCheck, XCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function VerifyProduct() {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCounterfeit, setIsCounterfeit] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!productId.trim()) return;

    try {
      setIsLoading(true);
      setError('');
      setProductData(null);
      setIsCounterfeit(false);

      const response = await API.get(`/products/${productId.trim()}`);
      const product = response.data.data;

      if (!product) {
        setIsCounterfeit(true);
      } else {
        setProductData(product);
      }
    } catch (err) {
      // If the product doesn't exist on the database/ledger, treat as counterfeit/unverified
      setIsCounterfeit(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProductId('');
    setProductData(null);
    setIsCounterfeit(false);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Public Product Verification</h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Enter the VerifyX ID found on your product's packaging or scan the QR code to check its immutable ledger history.
        </p>
      </div>

      <Card className="p-6 bg-white shadow-sm border border-slate-200">
        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter Product ID (e.g., VX-2026-14739C)..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
          <Button type="submit" isLoading={isLoading} className="px-6 py-3">
            Verify
          </Button>
        </form>
      </Card>

      {isCounterfeit && (
        <Card className="p-8 bg-white border-2 border-red-200 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">Security Alert: Counterfeit Warning</h3>
            <p className="text-xs text-red-600 max-w-md mx-auto">
              SECURITY ALERT: The product record data hash does not match the immutable blockchain ledger hash or could not be found!
            </p>
          </div>
          <Button variant="outline" onClick={handleReset} className="bg-white text-red-600 border-red-200 hover:bg-red-50">
            Reset Scanner
          </Button>
        </Card>
      )}

      {productData && (
        <Card className="p-6 bg-white shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Authentic Ledger Record Verified</h3>
                <p className="text-xs text-slate-500 font-mono">ID: {productData.productId}</p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
              {productData.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase">Product Name</p>
              <p className="font-bold text-slate-900 mt-1">{productData.name}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase">Batch / Lot Number</p>
              <p className="font-mono font-medium text-slate-900 mt-1">{productData.batchNumber || 'N/A'}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase">Current Custody Node</p>
              <p className="font-semibold text-slate-900 mt-1">{productData.currentHolder || 'Manufacturer'}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase">Manufacturer Entity</p>
              <p className="font-medium text-slate-900 mt-1">{productData.manufacturer || 'Verified Entity'}</p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <Button variant="outline" onClick={handleReset} className="bg-white">
              Verify Another Product
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}