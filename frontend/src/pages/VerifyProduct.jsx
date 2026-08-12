import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, 
  MapPin, Clock, Fingerprint, Flag, ArrowRight, Loader2, Link2
} from 'lucide-react';

export default function VerifyProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'authentic' or 'counterfeit'
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulating a blockchain query based on the scanned URL ID
    const verifyProduct = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // If the ID contains 'FAKE' (e.g., /verify/VX-9999-FAKE1), show the counterfeit screen[cite: 2]
      if (id?.includes('FAKE')) {
        setStatus('counterfeit');
      } else {
        // Otherwise, show the authentic screen with mock data matching the prototype[cite: 2]
        setStatus('authentic');
        setProduct({
          name: 'Premium Wireless Headphones',
          id: id || 'VX-2026-001284',
          txHash: '0x8f2d7e9...a91c4b2',
          timestamp: '10 Aug 2026, 14:32:01 IST',
          manufacturer: 'TechNova Industries',
          mfgDate: '12 July 2026',
        });
      }
      setLoading(false);
    };

    verifyProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6"
        >
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Verifying Product...</h2>
        <p className="text-slate-500 font-medium">Querying the VerifyX Blockchain Network</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center py-12 px-6">
      <div className="w-full max-w-lg">
        
        {/* VerifyX Header */}
        <div className="flex justify-center items-center gap-2 mb-10">
          <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-slate-900 dark:text-white">VerifyX Consumer Portal</span>
        </div>

        {status === 'authentic' && product && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            {/* Success Header */}
            <div className="bg-emerald-50 dark:bg-emerald-500/10 p-8 flex flex-col items-center text-center border-b border-emerald-100 dark:border-emerald-900/30">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-1">AUTHENTIC PRODUCT</h1>
              <p className="text-emerald-600 dark:text-emerald-400/80 text-sm font-medium">This product has been verified on the blockchain.</p>
            </div>

            {/* Product Details */}
            <div className="p-8 space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{product.name}</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  ID: {product.id}
                </span>
              </div>

              {/* Verification Details Box */}
              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                  <Fingerprint className="w-4 h-4 text-blue-500" />
                  Verification Details
                </h3>
                
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm">
                  <span className="text-slate-500 font-medium">Tx Hash:</span>
                  <span className="text-slate-900 dark:text-slate-300 font-mono text-right">{product.txHash}</span>
                  
                  <span className="text-slate-500 font-medium">Timestamp:</span>
                  <span className="text-slate-900 dark:text-slate-300 font-medium text-right">{product.timestamp}</span>
                  
                  <span className="text-slate-500 font-medium">Manufacturer:</span>
                  <span className="text-slate-900 dark:text-slate-300 font-medium text-right">{product.manufacturer}</span>
                </div>
              </div>

              {/* Traceability Link */}
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer">
                View Supply Chain Traceability
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {status === 'counterfeit' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-rose-200 dark:border-rose-900/50 overflow-hidden"
          >
            {/* Counterfeit Header */}
            <div className="bg-rose-50 dark:bg-rose-500/10 p-8 flex flex-col items-center text-center border-b border-rose-100 dark:border-rose-900/30">
              <div className="w-20 h-20 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold text-rose-800 dark:text-rose-300 mb-1 leading-tight">PRODUCT COULD NOT BE VERIFIED</h1>
              <p className="text-rose-600 dark:text-rose-400/80 text-sm font-bold mt-2 bg-rose-100 dark:bg-rose-500/20 px-3 py-1 rounded-full">
                Warning: Potential Counterfeit Detected
              </p>
            </div>

            <div className="p-8 space-y-6">
              <p className="text-center text-slate-600 dark:text-slate-400 font-medium">
                The scanned product information does not match any valid records on the VerifyX blockchain network.
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm">
                  <span className="text-slate-500 font-medium">Scanned ID:</span>
                  <span className="text-slate-900 dark:text-slate-300 font-mono text-right">{id}</span>
                  <span className="text-slate-500 font-medium">Blockchain Check:</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold text-right flex items-center justify-end gap-1">
                    <Link2 className="w-3 h-3" /> No Record Found
                  </span>
                </div>
              </div>

              <div className="flex gap-4 w-full pt-2">
                <button 
                  onClick={() => window.location.reload()}
                  className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Scan Again
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-rose-600 text-white py-3.5 rounded-xl font-bold hover:bg-rose-700 transition-colors cursor-pointer shadow-md shadow-rose-500/20">
                  <Flag className="w-4 h-4" /> Report Product
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}