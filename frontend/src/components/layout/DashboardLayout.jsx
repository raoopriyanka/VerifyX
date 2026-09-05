import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackagePlus, 
  Layers, 
  Truck, 
  QrCode, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  PackageCheck // 👈 Add PackageCheck here
} from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout() {
  const { logout, user } = useAuth();
  const location = useLocation();
  const role = user?.role?.toLowerCase() || 'manufacturer';

  // Define role-specific sidebar navigation items
  const getNavItems = () => {
    if (role === 'distributor') {
      return [
        { name: 'Logistics Portal', href: '/dashboard/distributor', icon: LayoutDashboard },
        { name: 'Supply Traceability', href: '/dashboard/traceability', icon: Truck },
       { name: 'QR Verification', href: '/dashboard/verify-qr', icon: ShieldCheck }, // 👈 Add this new item
      ];
    }
    if (role === 'retailer') {
      return [
        { name: 'Retail Dashboard', href: '/dashboard/retailer', icon: LayoutDashboard },
        { name: 'Supply Traceability', href: '/dashboard/traceability', icon: Truck },
        { name: 'Store Inventory', href: '/dashboard/retail/inventory', icon: PackageCheck },
        { name: 'Returns & Claims', href: '/dashboard/retail/returns', icon: AlertTriangle }
      ];
    }
    // Default Manufacturer items
    return [
      { name: 'Dashboard', href: '/dashboard/manufacturer', icon: LayoutDashboard },
      { name: 'Register Product', href: '/dashboard/register-product', icon: PackagePlus },
      { name: 'My Batches', href: '/dashboard/my-batches', icon: Layers },
      { name: 'Supply Traceability', href: '/dashboard/traceability', icon: Truck },
    ];
  };

  const navigationItems = getNavItems();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-500" /> VerifyX
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">Enterprise Trace</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User / Sign Out Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="truncate">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'User Node'}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role || role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Ganache Localnet Connected</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role || role}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}