import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, ShieldCheck, QrCode, Upload } from 'lucide-react';
import jsQR from 'jsqr';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function PublicVerify() {
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const extractId = (text) => {
    if (!text) return '';
    let cleaned = text.trim();
    if (cleaned.includes('/')) {
      const parts = cleaned.split('/');
      cleaned = parts[parts.length - 1] || cleaned;
    }
    try {
      const parsed = JSON.parse(cleaned);
      if (parsed.productId) cleaned = parsed.productId;
    } catch {
      // Not JSON, use string
    }
    return cleaned;
  };

  const handleVerify = async (rawInput) => {
    const id = extractId(rawInput);
    if (!id) return;

    try {
      setIsLoading(true);
      setErrorMsg('');
      setProductData(null);

      const res = await API.get(`/products/verify/${id}`);
      setProductData(res.data.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Product verification failed. Invalid or unminted ID.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify(queryInput);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height);

        if (code) {
          const cleanId = extractId(code.data);
          setQueryInput(cleanId);
          handleVerify(cleanId);
        } else {
          setErrorMsg('No valid QR code found in the uploaded image.');
        }
      };
      img.src = event.target?.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Public Product Verification</h1>
        <p className="text-sm text-slate-500">
          Enter the VerifyX ID found on your product's packaging or upload its QR code to check its immutable ledger history.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Enter Product ID (e.g., VX-2026-14739C)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              required
            />
          </div>
          <Button type="submit" isLoading={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Verify
          </Button>
        </form>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Alternative: Scan saved QR code image</span>
          <label className="cursor-pointer text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" /> Upload QR Image
            <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" />
          </label>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
          </div>
        )}
      </div>

      {productData && (
        <div className="bg-emerald-50/60 border border-emerald-200 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-200/60 pb-4">
            <span className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
              <CheckCircle className="w-4 h-4" /> Authentic Provenance Verified
            </span>
            <span className="font-mono text-xs text-slate-500">ID: {productData.productId}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-100">
              <p className="text-xs text-slate-400 font-medium">Product Name</p>
              <p className="font-bold text-slate-900 mt-0.5">{productData.name}</p>
            </div>
            <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-100">
              <p className="text-xs text-slate-400 font-medium">Batch / Lot</p>
              <p className="font-bold text-slate-900 mt-0.5 font-mono">{productData.batchNumber || 'N/A'}</p>
            </div>
            <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-100">
              <p className="text-xs text-slate-400 font-medium">Current Custodian</p>
              <p className="font-bold text-slate-900 mt-0.5">{productData.currentHolder || 'Manufacturer'}</p>
            </div>
            <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-100">
              <p className="text-xs text-slate-400 font-medium">Status</p>
              <p className="font-bold text-blue-600 mt-0.5">{productData.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}