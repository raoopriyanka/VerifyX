import React, { useState } from 'react';
import { Package, Hash, Calendar, Layers, Tag, QrCode, ArrowRight, Save, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import API from '../../services/api';

export default function RegisterProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Form state tracking
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    batchNumber: '',
    manufacturingDate: '',
    price: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const response = await API.post('/products', {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        description: formData.description,
        batchNumber: formData.batchNumber,
        manufacturingDate: formData.manufacturingDate,
        price: formData.price ? Number(formData.price) : undefined
      });

      console.log("Full Registration API Response:", response.data);

      // Extract the payload securely from any nested structure wrapper
      const responsePayload = response.data;
      const productObj = responsePayload.data || responsePayload.product || responsePayload;
      
      // Map precisely to your backend Mongoose schema key names
      const newProductId = 
        productObj.productId || 
        productObj.uniqueId || 
        productObj.serialNumber || 
        productObj.customId || 
        productObj.id || 
        productObj._id || 
        'VX-DEFAULT-ID';
      
      setGeneratedId(newProductId);
      setShowSuccessModal(true);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to register product.';
      setErrorMessage(msg);
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { value: '', label: 'Select Category...' },
    { value: 'electronics', label: 'Electronics & Sensors' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'luxury', label: 'Luxury Goods' },
    { value: 'machinery', label: 'Industrial Machinery' },
  ];

  const verificationUrl = `http://localhost:5173/verify/${generatedId}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <PageHeader 
        title="Register New Product" 
        description="Mint a new digital identity and record the origin node on the local database."
      />

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Main Form Column */}
          <div className="xl:col-span-2 space-y-6">
            
            <Card>
              <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Product Identification</h3>
                <p className="text-sm text-slate-500">Core details for the digital twin.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input 
                  id="name" 
                  label="Product Name" 
                  placeholder="e.g., High-Precision Sensor v2" 
                  icon={Package} 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <Input 
                  id="brand" 
                  label="Brand / Manufacturer" 
                  placeholder="e.g., VerifyX Corp" 
                  icon={Layers} 
                  value={formData.brand}
                  onChange={handleChange}
                  required 
                />
                <div className="md:col-span-2">
                  <Select 
                    id="category" 
                    label="Product Category" 
                    options={categoryOptions} 
                    value={formData.category}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Description (Optional)
                  </label>
                  <textarea 
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                    placeholder="Enter detailed product specifications..."
                  ></textarea>
                </div>
              </div>
            </Card>

            <Card>
              <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Manufacturing Metadata</h3>
                <p className="text-sm text-slate-500">Batch details to be hashed on the ledger.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input 
                  id="batchNumber" 
                  label="Batch / Lot Number" 
                  placeholder="e.g., BATCH-2026-08A" 
                  icon={Hash} 
                  value={formData.batchNumber}
                  onChange={handleChange}
                  required 
                />
                <Input 
                  id="manufacturingDate" 
                  type="date" 
                  label="Manufacturing Date" 
                  icon={Calendar} 
                  value={formData.manufacturingDate}
                  onChange={handleChange}
                  required 
                />
                <Input 
                  id="price" 
                  type="number" 
                  label="MSRP (Optional)" 
                  placeholder="0.00" 
                  icon={Tag} 
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </Card>

          </div>

          {/* Side Column */}
          <div className="space-y-6">
            <Card className="bg-blue-50 border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 mb-2">Ledger Registration</h3>
              <p className="text-xs text-blue-700 leading-relaxed mb-4">
                Upon registration, a unique cryptographic hash will be generated. This action writes the origin record to your local MongoDB backend.
              </p>
              <div className="space-y-3">
                <Button type="submit" className="w-full" isLoading={isLoading} icon={ArrowRight}>
                  Mint & Register Product
                </Button>
                <Button type="button" variant="outline" className="w-full bg-white" icon={Save}>
                  Save Draft
                </Button>
              </div>
            </Card>
          </div>

        </div>
      </form>

      {/* Success Modal */}
      <Modal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        title="Registration Successful"
      >
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-2">Digital Identity Minted</h4>
          <p className="text-sm text-slate-500 mb-6 max-w-sm">
            The product has been successfully registered on the VerifyX backend database.
          </p>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 w-full flex flex-col items-center mb-6">
            <div className="p-3 bg-white border border-slate-300 rounded-lg inline-flex items-center justify-center mb-4 shadow-sm">
              <QRCodeSVG value={verificationUrl} size={128} />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">VerifyX Product ID</p>
            <div className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md">
              <span className="text-base font-mono font-bold text-blue-700 tracking-wide select-all">
                {generatedId}
              </span>
            </div>
          </div>

          <div className="flex w-full gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
            <Button className="flex-1" icon={QrCode} onClick={() => window.print()}>
              Print Label
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}