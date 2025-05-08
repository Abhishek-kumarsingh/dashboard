import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  CreditCard,
  FileText,
  Settings,
  HelpCircle,
  Truck,
  BarChart3,
  Tags,
  MessageSquare,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowLeftCircle,
  ArrowRightCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  children?: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  active,
  onClick,
  hasSubmenu,
  isSubmenuOpen,
  children
}) => {
  return (
    <li>
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200",
          active
            ? "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 shadow-sm"
            : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
        )}
        onClick={onClick}
        data-aos="fade-right"
        data-aos-delay={100}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
            active
              ? "text-primary-600 bg-primary-50 dark:text-primary-300 dark:bg-primary-900/50 shadow-inner"
              : "text-neutral-500 bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800"
          )}>
            {icon}
          </div>
          <span className={cn("font-medium transition-all", active ? "translate-x-1" : "")}>{label}</span>
        </div>
        {hasSubmenu && (
          <div className="transition-transform duration-200">
            {isSubmenuOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
        )}
      </div>
      {hasSubmenu && isSubmenuOpen && (
        <div className="ml-12 mt-1 overflow-hidden transition-all duration-300 ease-in-out">
          {children}
        </div>
      )}
    </li>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, id = 'sidebar' }) => {
  const { theme, isFirstVisit } = useTheme();
  const [activeLink, setActiveLink] = useState('dashboard');
  const [openSubmenu, setOpenSubmenu] = useState<string | null>('products');
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(!isFirstVisit); // Unpinned on first visit

  // Show close button on larger screens when hovered
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowCloseButton(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar pinned state
  const togglePinned = () => {
    setSidebarPinned(prev => !prev);
    if (sidebarPinned) {
      // If currently pinned, unpinning should close the sidebar
      onClose();
    }
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(prev => prev === menu ? null : menu);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        id={id}
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 transform transition-all duration-300 ease-in-out bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800",
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full shadow-none",
          // On large screens, show sidebar based on pinned state
          sidebarPinned ? "lg:translate-x-0" : "lg:-translate-x-full"
        )}
        onMouseEnter={() => setShowCloseButton(true)}
        onMouseLeave={() => setShowCloseButton(false)}
      >
        {/* Toggle pin/unpin button for large screens */}
        <button
          className={cn(
            "absolute -right-4 top-20 bg-white dark:bg-neutral-800 rounded-full p-1 shadow-md border border-neutral-200 dark:border-neutral-700 transition-opacity duration-300",
            showCloseButton || !sidebarPinned ? "opacity-100" : "opacity-0",
            "hidden lg:flex items-center justify-center z-50"
          )}
          onClick={togglePinned}
          aria-label={sidebarPinned ? "Unpin sidebar" : "Pin sidebar"}
        >
          {sidebarPinned ? (
            <ArrowLeftCircle size={24} className="text-primary-600 dark:text-primary-400" />
          ) : (
            <ArrowRightCircle size={24} className="text-primary-600 dark:text-primary-400" />
          )}
        </button>

        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
                <ShoppingBag className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-200">ShopDash</h1>
            </div>
            <button
              className="lg:hidden rounded-xl p-2.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors hover:shadow-sm"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        <nav className="px-4 py-2 overflow-y-auto h-[calc(100vh-180px)]">
          <div className="mb-2 px-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Main
          </div>
          <ul className="space-y-1 mb-6">
            <SidebarLink
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              active={activeLink === 'dashboard'}
              onClick={() => setActiveLink('dashboard')}
            />
            <SidebarLink
              icon={<BarChart3 size={18} />}
              label="Analytics"
              active={activeLink === 'analytics'}
              onClick={() => setActiveLink('analytics')}
            />
          </ul>

          <div className="mb-2 px-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Store Management
          </div>
          <ul className="space-y-1 mb-6">
            <SidebarLink
              icon={<Package size={18} />}
              label="Products"
              active={activeLink === 'products'}
              hasSubmenu={true}
              isSubmenuOpen={openSubmenu === 'products'}
              onClick={() => toggleSubmenu('products')}
            >
              <ul className="space-y-1 mt-1">
                <li className="px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-sm transition-colors">
                  All Products
                </li>
                <li className="px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-sm transition-colors">
                  Categories
                </li>
                <li className="px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-sm transition-colors">
                  Inventory
                </li>
              </ul>
            </SidebarLink>
            <SidebarLink
              icon={<ShoppingBag size={18} />}
              label="Orders"
              active={activeLink === 'orders'}
              onClick={() => setActiveLink('orders')}
            />
            <SidebarLink
              icon={<Users size={18} />}
              label="Customers"
              active={activeLink === 'customers'}
              onClick={() => setActiveLink('customers')}
            />
            <SidebarLink
              icon={<Truck size={18} />}
              label="Shipping"
              active={activeLink === 'shipping'}
              onClick={() => setActiveLink('shipping')}
            />
            <SidebarLink
              icon={<Tags size={18} />}
              label="Discounts"
              active={activeLink === 'discounts'}
              onClick={() => setActiveLink('discounts')}
            />
            <SidebarLink
              icon={<CreditCard size={18} />}
              label="Payments"
              active={activeLink === 'payments'}
              onClick={() => setActiveLink('payments')}
            />
            <SidebarLink
              icon={<MessageSquare size={18} />}
              label="Reviews"
              active={activeLink === 'reviews'}
              onClick={() => setActiveLink('reviews')}
            />
          </ul>

          <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <ul className="space-y-1">
              <SidebarLink
                icon={<Settings size={18} />}
                label="Settings"
                active={activeLink === 'settings'}
                onClick={() => setActiveLink('settings')}
              />
              <SidebarLink
                icon={<HelpCircle size={18} />}
                label="Help Center"
                active={activeLink === 'help'}
                onClick={() => setActiveLink('help')}
              />
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;