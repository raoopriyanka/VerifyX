import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, X, LogOut } from 'lucide-react';
import { NAVIGATION_ITEMS } from './navigationConfig';

export default function MobileSidebar({ isOpen, onClose, role = 'manufacturer' }) {
  const navItems = NAVIGATION_ITEMS[role] || NAVIGATION_ITEMS.public;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />

      {/* Drawer */}
      <div className="relative flex flex-col w-72 max-w-full bg-slate-900 text-slate-300 h-full shadow-2xl z-10">
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">VerifyX</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-400 hover:text-rose-400 rounded-lg">
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}