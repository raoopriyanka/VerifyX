import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Cpu, CheckCircle2, Download, 
  Package, Calendar, MapPin, Sparkles, Loader2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

export default function RegisterProduct() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Smart Watch Gen 3',
    category: 'Electronics',
    batch: 'BATCH-2026-X9',
    mfgDate: '2026-08-12',
    location: 'Mumbai, India'
  });

  const [registeredData, setRegisteredData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulating Blockchain Transaction / Smart Contract Minting
    setTimeout(() => {
      const generatedId = `VX-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedTx = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      setRegisteredData({
        id: generatedId,
        txHash: generatedTx,
        ...formData
      });

      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const downloadQR = () => {
    const svg = document.getElementById('product-qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `${registeredData.id}-QRCode.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 p-6 flex justify-center items-center">
      <div className="w-full max-w-2xl">
        
        {/* Back Link */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <AnimatePresence mode="wait">
          {!success ? (
            /* --- FORM STATE --- */
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Register New Product</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Mint a digital identity onto the VerifyX blockchain network[cite: 1, 2].</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Product Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                      <Package className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                    >
                      <option>Electronics</option>
                      <option>Pharmaceuticals</option>
                      <option>Luxury Goods</option>
                      <option>Automotive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Batch Number</label>
                    <input 
                      type="text" 
                      required
                      value={formData.batch}
                      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Mfg Date</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        required
                        value={formData.mfgDate}
                        onChange={(e) => setFormData({ ...formData, mfgDate: e.target.value })}
                        className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                      <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Manufacturing Location</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Minting Smart Contract...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Register & Generate QR Code
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* --- SUCCESS STATE (Matching Slide 13) --- */
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Product Successfully Registered</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">The product has been minted on the blockchain and a unique digital identity is created.</p>

              {/* QR Code Container */}
              <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 shadow-inner flex flex-col items-center">
                <QRCodeSVG 
                  id="product-qr-code"
                  value={`http://localhost:5173/verify/${registeredData.id}`} 
                  size={180}
                  level="H"
                  includeMargin={true}
                />
                <div className="mt-4 font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {registeredData.id}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1 max-w-xs truncate">
                  Tx: {registeredData.txHash}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 w-full">
                <Link to="/dashboard" className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Done
                </Link>
                <button 
                  onClick={downloadQR}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-md shadow-blue-500/20"
                >
                  <Download className="w-5 h-5" /> Download QR
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}