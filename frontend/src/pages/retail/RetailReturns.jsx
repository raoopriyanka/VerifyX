import React, { useState, useEffect } from 'react';
import { AlertTriangle, Send, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function RetailReturns() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [issueType, setIssueType] = useState('DAMAGED_GOODS');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  
  // Initialize logs from localStorage if available
  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('retail_discrepancy_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data.data || []);
      } catch (err) {
        console.error('Failed to load products for returns log:', err);
      }
    };
    fetchStock();
  }, []);

  // Save to localStorage whenever logs change
  useEffect(() => {
    try {
      localStorage.setItem('retail_discrepancy_logs', JSON.stringify(logs));
    } catch (err) {
      console.error('Failed to save logs to storage', err);
    }
  }, [logs]);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !notes.trim()) {
      setFeedback({ message: 'Please select a product and provide audit notes.', type: 'error' });
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback({ message: '', type: '' });

      await API.patch(`/products/${selectedProduct}/transfer`, {
        status: 'DISCREPANCY_FLAGGED',
        notes: `[${issueType}] ${notes.trim()}`
      });

      setFeedback({ 
        message: `Discrepancy successfully logged for product ${selectedProduct} with tamper-evident audit trail.`, 
        type: 'success' 
      });

      const newLog = {
        id: Date.now(),
        productId: selectedProduct,
        issueType,
        notes: notes.trim(),
        date: new Date().toLocaleString()
      };

      setLogs(prev => [newLog, ...prev]);
      setNotes('');
      setSelectedProduct('');
    } catch (err) {
      setFeedback({ message: err.response?.data?.message || 'Failed to submit discrepancy report.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <PageHeader 
        title="Returns & Discrepancies Log" 
        description="Log damaged items, customer returns, or supply chain discrepancies with ledger-backed audit notes."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 p-6 bg-white border-t-4 border-t-amber-500">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Log New Discrepancy
          </h3>

          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-500 mb-1">Select Product</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">-- Choose Product ID --</option>
                {products.map(p => (
                  <option key={p.productId} value={p.productId}>
                    {p.productId} - {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-slate-500 mb-1">Issue Category</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="DAMAGED_GOODS">Damaged Goods / Packaging</option>
                <option value="CUSTOMER_RETURN">Customer Return</option>
                <option value="QUANTITY_MISMATCH">Quantity / Batch Mismatch</option>
                <option value="QUALITY_DEFECT">Quality Defect</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-slate-500 mb-1">Audit Notes & Description</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provide detailed explanation for the distributor/manufacturer audit trail..."
                rows={4}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                required
              />
            </div>

            {feedback.message && (
              <p className={`text-xs p-3 rounded-lg font-medium ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                {feedback.message}
              </p>
            )}

            <Button type="submit" isLoading={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              Submit Audit Report
            </Button>
          </form>
        </Card>

        <Card className="lg:col-span-2 p-6 bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Discrepancy & Return Audit Logs</h3>
          
          <div className="space-y-3">
            {logs.length === 0 ? (
              <div className="py-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
                <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">No return or discrepancy reports filed yet.</p>
              </div>
            ) : (
              logs.log?.length !== 0 && logs.map(log => (
                <div key={log.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {log.issueType}
                    </span>
                    <span className="text-xs text-slate-400">{log.date}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">Product: {log.productId}</p>
                  <p className="text-xs text-slate-600 bg-white p-2.5 rounded border border-slate-100 font-mono">
                    {log.notes}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}