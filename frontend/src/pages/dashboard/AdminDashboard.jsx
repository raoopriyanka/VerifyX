import React from 'react';
import { Users, Package, AlertTriangle, Activity } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const ADMIN_STATS = [
  { label: 'Total Network Users', value: '142', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Global Products Tracked', value: '45,291', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Counterfeits Detected', value: '12', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
  { label: 'Network Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const RECENT_TRANSACTIONS = [
  { hash: '0x8f2a...3b91', action: 'Product Registered', actor: 'Manufacturer_A', status: 'Confirmed' },
  { hash: '0x4c1d...7e22', action: 'Custody Transfer', actor: 'Distributor_North', status: 'Confirmed' },
  { hash: '0x9a3f...1c44', action: 'Verification Attempt', actor: 'Public Scan', status: 'Failed (Invalid Signature)' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Admin Control Center" 
        description="Monitor system health, user roles, and global ledger events."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ADMIN_STATS.map((stat, idx) => (
          <Card key={idx} className="flex flex-col p-6 border-t-4" style={{ borderTopColor: stat.bg === 'bg-rose-50' ? '#f43f5e' : '#3b82f6' }}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">Recent Blockchain Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Tx Hash</th>
                <th className="px-6 py-4 font-semibold">Action</th>
                <th className="px-6 py-4 font-semibold">Node / Actor</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {RECENT_TRANSACTIONS.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">{tx.hash}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">{tx.action}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.actor}</td>
                  <td className="px-6 py-4">
                    <Badge variant={tx.status.includes('Failed') ? 'error' : 'success'}>{tx.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}