import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Public Header */}
      <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-sm shadow-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-lg">VerifyX</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#supply-chain" className="hover:text-slate-900 transition-colors">Supply Chain</a>
            <a href="#technology" className="hover:text-slate-900 transition-colors">Technology</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/verify">
              <Button variant="outline" size="sm">Verify Product</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Body Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-600 rounded-lg text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">VerifyX Platform</span>
          </div>
          <p>© 2026 VerifyX. Immutable Product Authentication & Provenance Ledger.</p>
        </div>
      </footer>
    </div>
  );
}