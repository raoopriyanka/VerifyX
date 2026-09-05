import React, { useState, useRef } from 'react';
import { QrCode, Search, CheckCircle, AlertCircle, ShieldCheck, Upload } from 'lucide-react';
import jsQR from 'jsqr';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function QRVerification() {
  const [productIdInput, setProductIdInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedProduct, setVerifiedProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const extractProductId = (rawText) => {
    if (!rawText) return '';
    let cleaned = rawText.trim();

    // If it's a full URL path (e.g., http://localhost:5173/verify/VX-2026-B6AC9C), extract the final segment
    if (cleaned.includes('/')) {
      const segments = cleaned.split('/');
      cleaned = segments[segments.length - 1] || cleaned;
    }

    // If it's stored as a JSON string containing the id, parse it out
    try {
      const parsed = JSON.parse(cleaned);
      if (parsed.productId) cleaned = parsed.productId;
    } catch {
      // Not JSON, keep text as is
    }

    return cleaned;
  };

  const fetchProductDetails = async (rawInput) => {
    const id = extractProductId(rawInput);
    if (!id) return;

    try {
      setIsLoading(true);
      setErrorMsg('');
      setVerifiedProduct(null);

      const res = await API.get(`/products/verify/${id}`);
      setVerifiedProduct(res.data.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Product verification failed. Invalid ID.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualVerify = (e) => {
    e.preventDefault();
    if (!productIdInput.trim()) return;
    fetchProductDetails(productIdInput);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        canvasContext.drawImage(img, 0, 0);

        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
          const cleanId = extractProductId(qrCode.data);
          setProductIdInput(cleanId);
          fetchProductDetails(cleanId);
        } else {
          setErrorMsg('Could not detect a valid QR code in the uploaded image.');
        }
      };
      img.src = event.target?.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <PageHeader 
        title="QR Code & Node Verification" 
        description="Upload a generated product QR code image or enter the Product ID to verify authenticity."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="p-6 bg-white border-t-4 border-t-blue-600">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" /> Manual ID Lookup
            </h3>

            <form onSubmit={handleManualVerify} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-500 mb-1">Product Alphanumeric Code</label>
                <input
                  type="text"
                  value={productIdInput}
                  onChange={(e) => setProductIdInput(e.target.value)}
                  placeholder="e.g., VX-2026-B03DEC"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  required
                />
              </div>

              <Button type="submit" isLoading={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Verify Node ID
              </Button>
            </form>
          </Card>

          <Card className="p-6 bg-white border-t-4 border-t-indigo-600">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-indigo-600" /> Scan QR Code Image
            </h3>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-xl p-8 text-center cursor-pointer bg-indigo-50/30 transition-colors"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
              <p className="text-sm font-semibold text-slate-700">Upload saved product QR code image</p>
              <p className="text-xs text-slate-400 mt-1">Supports PNG, JPEG files generated during minting</p>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-white h-fit">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" /> Verification Result
          </h3>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
            </div>
          )}

          {!verifiedProduct ? (
            <div className="py-16 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
              <QrCode className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">Lookup a product ID or upload a QR code image to inspect ledger status.</p>
            </div>
          ) : (
            <div className="space-y-4 bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Authentic Node Verified
                </span>
                <span className="font-mono text-xs text-slate-500">{verifiedProduct.productId}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t border-emerald-100/60">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Product Name</p>
                  <p className="font-bold text-slate-800">{verifiedProduct.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Batch / Lot</p>
                  <p className="font-bold text-slate-800 font-mono">{verifiedProduct.batchNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Current Holder</p>
                  <p className="font-bold text-slate-800">{verifiedProduct.currentHolder || 'Manufacturer'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Status</p>
                  <p className="font-bold text-blue-600">{verifiedProduct.status}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}