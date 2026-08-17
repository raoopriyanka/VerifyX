import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Column: SaaS Branding Hero */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 text-white p-12 relative overflow-hidden">
        <div className="z-10 flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">VerifyX</span>
        </div>

        <div className="z-10 space-y-6 max-w-md">
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Immutable supply-chain verification and anti-counterfeit infrastructure.
          </h2>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Cryptographic custody handover tracking
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Tamper-evident smart contract event ledger
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Instant customer QR provenance verification
            </li>
          </ul>
        </div>

        <div className="z-10 flex items-center gap-2 text-xs text-slate-400">
          <Lock className="w-3.5 h-3.5" />
          <span>Role-Based Access Control Architecture</span>
        </div>
      </div>

      {/* Right Column: Dynamic Form Outlet */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">VerifyX</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}