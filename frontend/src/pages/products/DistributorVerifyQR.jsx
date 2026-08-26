import React, { useState, useRef } from 'react';
import { QrCode, ShieldCheck, XCircle, Upload, Camera } from 'lucide-react';
import jsQR from 'jsqr';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function DistributorVerifyQR() {
  const [queryId, setQueryId] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const fetchProductDetails = async (id) => {
    try {
      setIsLoading(true);
      setError('');
      setResult(null);

      const response = await API.get(`/products/${id.trim()}`);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || `Product node "${id}" not found on ledger.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!queryId.trim()) return;
    fetchProductDetails(queryId);
  };

  // Handle image upload and scan QR code pixels
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setQueryId(code.data);
          fetchProductDetails(code.data);
        } else {
          setError('Could not detect a valid QR code in this image. Please try another image or enter the ID manually.');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12">
      <PageHeader 
        title="QR Code & Node Verification" 
        description="Upload a generated product QR code image or enter the Product ID to verify authenticity."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manual Lookup Card */}
        <Card className="p-6 bg-white shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Manual ID Lookup</h3>
            <p className="text-xs text-slate-500 mb-4">Type or paste the unique product alphanumeric code.</p>
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div className="relative">
                <QrCode className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={queryId}
                  onChange={(e) => setQueryId(e.target.value)}
                  placeholder="e.g., VX-2026-B03DEC"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
              <Button type="submit" isLoading={isLoading} className="w-full">
                Verify Node ID
              </Button>
            </form>
          </div>
        </Card>

        {/* QR Scanner / Image Upload Card */}
        <Card className="p-6 bg-white shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Scan QR Code Image</h3>
            <p className="text-xs text-slate-500 mb-4">Upload the saved product QR code image to decode and verify automatically.</p>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
            
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()} 
              className="w-full py-4 border-dashed border-2 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100"
            >
              <Upload className="w-5 h-5 text-blue-600" />
              <span>Upload QR Code Image</span>
            </Button>
          </div>
        </Card>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <Card className="p-6 bg-white shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Authentic Ledger Node Verified</h3>
                <p className="text-xs text-slate-500 font-mono">ID: {result.productId}</p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
              {result.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase">Product Name</p>
              <p className="font-bold text-slate-900 mt-1">{result.name}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase">Batch / Lot Number</p>
              <p className="font-mono font-medium text-slate-900 mt-1">{result.batchNumber || 'N/A'}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase">Current Custody Holder</p>
              <p className="font-semibold text-slate-900 mt-1">{result.currentHolder || 'Manufacturer'}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase">Manufacturer Email</p>
              <p className="font-medium text-slate-900 mt-1">{result.manufacturer || 'Verified Entity'}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}