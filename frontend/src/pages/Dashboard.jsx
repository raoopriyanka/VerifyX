import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, PlusCircle, Network, 
  FileText, Database, ShieldCheck, Truck, AlertTriangle, 
  CheckCircle2, Search, Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data from your prototype
const stats = [
  { label: 'Total Products', value: '1,284', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Verified Products', value: '1,247', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'In Transit', value: '32', icon: Truck, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Flagged', value: '5', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

const recentProducts = [
  { id: 'VX-2026-01284', name: 'Wireless Headphones', status: 'Delivered', blockchain: 'Verified', badge: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400' },
  { id: 'VX-2026-01285', name: 'Smart Watch Gen 3', status: 'In Transit', blockchain: 'Verified', badge: 'text-amber-700 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-400' },
  { id: 'VX-2026-01286', name: 'Bluetooth Speaker', status: 'Flagged', blockchain: 'Alert', badge: 'text-rose-700 bg-rose-100 dark:bg-rose-500/20 dark:text-rose-400' },
  { id: 'VX-2026-01287', name: 'Wireless Charger', status: 'Warehouse', blockchain: 'Verified', badge: 'text-blue-700 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400' },
];

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { ease: "easeOut" } }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950">
      
      {/* Sidebar */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-6">
        <Link to="/dashboard/new" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all mb-8 cursor-pointer">
          <PlusCircle className="w-5 h-5" /> New Product
        </Link>
        
        <nav className="space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium transition-colors">
            <Package className="w-5 h-5" /> Products
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium transition-colors">
            <Network className="w-5 h-5" /> Supply Chain
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium transition-colors">
            <FileText className="w-5 h-5" /> Verification Logs
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium transition-colors">
            <Database className="w-5 h-5" /> Blockchain Records
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">TechNova Ind. Manufacturer Portal</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Network: Operational
              </div>
              <button className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 cursor-pointer shadow-sm">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Products Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Products</h2>
              <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 text-sm">
                    <th className="px-6 py-4 font-semibold">Product ID</th>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Blockchain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  {recentProducts.map((product, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm">{product.id}</td>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">{product.status}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.badge}`}>
                          {product.blockchain}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}