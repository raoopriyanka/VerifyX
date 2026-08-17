import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  Truck,
  ShieldCheck,
  History,
  QrCode,
  FileCheck,
  Settings,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const NAVIGATION_ITEMS = {
  admin: [
    { label: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'User Directory', path: '/dashboard/admin', icon: Users },
    { label: 'All Products', path: '/dashboard/admin', icon: Package },
    { label: 'Supply Chain Nodes', path: '/dashboard/admin', icon: Truck },
    { label: 'Verifications', path: '/dashboard/admin', icon: ShieldCheck },
    { label: 'Ledger Transactions', path: '/dashboard/admin', icon: History },
    { label: 'Settings', path: '/dashboard/admin', icon: Settings },
  ],
  manufacturer: [
    { label: 'Dashboard', path: '/dashboard/manufacturer', icon: LayoutDashboard },
    { label: 'Register Product', path: '/products/register', icon: Package },
    { label: 'My Batches', path: '/dashboard/manufacturer', icon: Boxes },
    { label: 'Supply Traceability', path: '/products/tracking', icon: Truck },
    { label: 'Verification Logs', path: '/dashboard/manufacturer', icon: FileCheck },
  ],
  distributor: [
    { label: 'Dashboard', path: '/dashboard/distributor', icon: LayoutDashboard },
    { label: 'Incoming Batches', path: '/dashboard/distributor', icon: Boxes },
    { label: 'Active Shipments', path: '/dashboard/distributor', icon: Send },
    { label: 'Tracking & Custody', path: '/products/tracking', icon: Truck },
  ],
  retailer: [
    { label: 'Dashboard', path: '/dashboard/retailer', icon: LayoutDashboard },
    { label: 'Received Inventory', path: '/dashboard/retailer', icon: CheckCircle2 },
    { label: 'Storefront Stock', path: '/dashboard/retailer', icon: Boxes },
    { label: 'Product Tracking', path: '/products/tracking', icon: Truck },
    { label: 'Point of Sale (Sold)', path: '/dashboard/retailer', icon: QrCode },
  ],
  public: [
    { label: 'Verify Product', path: '/verify', icon: ShieldCheck },
  ],
};