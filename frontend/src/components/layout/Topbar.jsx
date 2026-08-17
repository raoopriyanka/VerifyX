import React from 'react';
import { Menu, Bell, Search, Shield, ChevronDown } from 'lucide-react';

export default function Topbar({ onMenuClick, userRole = 'Manufacturer' }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Quick Search */}
        <div className="hidden sm:flex items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Product ID, Hash, Batch..."
            className="w-72 pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Network & Node Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-medium text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Ganache Localnet Connected
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-700 flex items-center justify-center font-semibold text-xs border border-blue-600/20">
            VX
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-800 leading-tight">Priyanka Rao</span>
            <span className="text-[10px] text-slate-500 capitalize">{userRole}</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}