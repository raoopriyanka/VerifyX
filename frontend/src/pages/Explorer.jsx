import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Box, Database, Clock, ArrowLeft, Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockTransactions = [
  { block: '#12842', hash: '0x8f2d7e90c1a...a91c4b2', id: 'VX-2026-001285', event: 'ProductRegistered', time: '10 Aug 2026, 15:30', status: 'Confirmed', statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20' },
  { block: '#12841', hash: '0x3b1a2c4e5f6...f42d8e1', id: 'VX-2026-001284', event: 'StatusUpdated', time: '10 Aug 2026, 15:28', status: 'Confirmed', statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20' },
  { block: '#12841', hash: '0x7c9e1b3a4d5...2b8a6f9', id: 'VX-2026-001011', event: 'LocationUpdated', time: '10 Aug 2026, 15:28', status: 'Confirmed', statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20' },
  { block: '#12840', hash: '0xa1b2c3d4e5f...67890ab', id: 'VX-2026-000955', event: 'VerificationFlagged', time: '10 Aug 2026, 15:25', status: 'Confirmed', statusColor: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20' },
  { block: '#12839', hash: '0xf1e2d3c4b5a...9876543', id: 'VX-2026-001283', event: 'ProductRegistered', time: '10 Aug 2026, 15:22', status: 'Confirmed', statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20' },
];

export default function Explorer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <Hexagon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              VerifyX Network Explorer
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Live blockchain transaction ledger</p>
          </div>
        </div>

        {/* Network Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
            <div className="p-4 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <Box className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Total Blocks</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">12,842</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Database className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Total Transactions</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">48,291</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Network Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Operational</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 font-bold">Block</th>
                  <th className="px-6 py-4 font-bold">Tx Hash</th>
                  <th className="px-6 py-4 font-bold">Product ID</th>
                  <th className="px-6 py-4 font-bold">Event / Method</th>
                  <th className="px-6 py-4 font-bold">Timestamp</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm font-medium">
                {mockTransactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-bold">{tx.block}</td>
                    <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">{tx.hash}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-300 font-bold">{tx.id}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md font-mono text-xs">
                        {tx.event}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {tx.time}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${tx.statusColor}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}