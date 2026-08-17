import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, LogOut } from 'lucide-react';
import { NAVIGATION_ITEMS } from './navigationConfig';

export default function Sidebar({ role = 'manufacturer', collapsed = false }) {
  const navItems = NAVIGATION_ITEMS[role] || NAVIGATION_ITEMS.public;

  return (
    <aside
      className={`hidden md:flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Identity */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/80 gap-3">
        <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-500/20">
          <ShieldCheck className="w-5 h-5" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight text-lg leading-none">VerifyX</span>
            <span className="text-[10px] text-blue-400 font-medium tracking-wider uppercase mt-1">Enterprise Trace</span>
          </div>
        )}
      </div>

      {/* Role Indicator Badge */}
      {!collapsed && (
        <div className="px-6 py-4">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2">
            <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Active Workspace</p>
            <p className="text-xs font-medium text-slate-200 capitalize mt-0.5">{role} Portal</p>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                } ${collapsed ? 'justify-center px-0' : ''}`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Profile / Logout Placeholder */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors">
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}