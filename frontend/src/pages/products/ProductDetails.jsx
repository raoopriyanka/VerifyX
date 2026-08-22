import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Shield, Calendar, Tag, Layers, ArrowLeft, QrCode, AlertCircle, Loader2 } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import API from '../../services/api';

export default function ProductDetails() {
  const { productId } = useParams(); // Grabs VX-YYYY-XXXXXX from the URL route
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const response = await API.get(`/products/${productId}`);
        setProduct(response.data.data);
      } catch (err) {
        setErrorMessage(err.response?.data?.message || 'Product not found or failed to load.');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (errorMessage || !product) {
    return (
      <div className="space-y-6">
        <PageHeader title="Product Details" description="Inspect individual product digital twin metadata." />
        <Card className="p-8 text-center bg-red-50 border-red-100">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-red-900 mb-1">Unable to Load Product</h3>
          <p className="text-sm text-red-600 mb-4">{errorMessage || 'The requested product could not be found.'}</p>
          <Link to="/dashboard/manufacturer">
            <Button variant="outline" className="bg-white">Return to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <PageHeader 
          title={`Product: ${product.productId}`} 
          description="Detailed metadata and cryptographic verification hash record."
        />
        <Link to="/dashboard/manufacturer">
          <Button variant="outline" icon={ArrowLeft} className="bg-white">Back</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Details Column */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <div className="mb-6 border-b border-slate-100 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-500">Brand: {product.brand}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {product.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</span>
                <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-500" /> {product.category}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Batch Number</span>
                <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <Package className="w-4 h-4 text-slate-500" /> {product.batchNumber}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Manufacturing Date</span>
                <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" /> 
                  {new Date(product.manufacturingDate).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Holder</span>
                <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-500" /> {product.currentHolder}
                </p>
              </div>
            </div>

            {product.description && (
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</span>
                <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
              </div>
            )}
          </Card>

          <Card>
            <div className="mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-md font-bold text-slate-900">Cryptographic Integrity Hash</h3>
              <p className="text-xs text-slate-500">SHA-256 fingerprint anchored to product parameters.</p>
            </div>
            <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-xs break-all">
              {product.verificationHash}
            </div>
          </Card>
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
          <Card className="bg-slate-50 border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Manufacturer Information</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p><strong className="text-slate-900">Name:</strong> {product.manufacturer?.name || 'N/A'}</p>
              <p><strong className="text-slate-900">Organization:</strong> {product.manufacturer?.organization || 'N/A'}</p>
              <p><strong className="text-slate-900">Registered At:</strong> {new Date(product.createdAt).toLocaleString()}</p>
            </div>
          </Card>

          <Card className="text-center">
            <div className="w-32 h-32 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
              <QrCode className="w-12 h-12 text-slate-400" />
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">VerifyX ID</p>
            <p className="text-md font-mono font-bold text-blue-600 mt-1">{product.productId}</p>
          </Card>
        </div>

      </div>
    </div>
  );
}