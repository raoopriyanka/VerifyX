import React from 'react';
import { Package, Truck, ShieldCheck, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

// Mock Data for UI Visualization
const MOCK_STATS = [
  { label: 'Total Registered Units', value: '1,284', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Units In Transit', value: '342', icon: Truck, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Successfully Verified', value: '892', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const RECENT_PRODUCTS = [
  { id: 'VX-8829-A1', name: 'High-Precision Sensor v2', category: 'Electronics', status: 'Manufactured', date: '2026-08-17' },
  { id: 'VX-8829-A2', name: 'High-Precision Sensor v2', category: 'Electronics', status: 'In Transit', date: '2026-08-16' },
  { id: 'VX-7731-B4', name: 'Industrial Servo Motor', category: 'Machinery', status: 'Received', date: '2026-08-15' },
  { id: 'VX-9910-C1', name: 'Aerospace Grade Alloy 5kg', category: 'Materials', status: 'Sold', date: '2026-08-10' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Manufactured': return <Badge variant="info">Manufactured</Badge>;
    case 'In Transit': return <Badge variant="warning">In Transit</Badge>;
    case 'Received': return <Badge variant="primary">Received</Badge>;
    case 'Sold': return <Badge variant="success">Authentic & Sold</Badge>;
    default: return <Badge>{status}</Badge>;
  }
};

export default function ManufacturerDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Manufacturer Workspace" 
        description="Manage your registered products and monitor supply-chain nodes."
      >
        <Link to="/products/register">
          <Button icon={Plus}>Register New Product</Button>
        </Link>
      </PageHeader>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_STATS.map((stat, idx) => (
          <Card key={idx} className="flex items-center p-6 gap-4">
            <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Registrations Table */}
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">Recent Product Registrations</h3>
          <Button variant="ghost" size="sm" className="text-blue-600">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Product ID</th>
                <th className="px-6 py-4 font-semibold">Product Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Current Status</th>
                <th className="px-6 py-4 font-semibold">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {RECENT_PRODUCTS.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{prod.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{prod.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{prod.category}</td>
                  <td className="px-6 py-4">{getStatusBadge(prod.status)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{prod.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}