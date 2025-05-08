import React, { useState } from 'react';
import { Bell, Search, Menu, Moon, Sun, ChevronDown, MessageSquare, HelpCircle, Settings, PanelLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarOpen?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, isSidebarOpen = false }) => {
  const { theme, toggleTheme, isFirstVisit } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="sticky top-0 z-30 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all hover:shadow-sm"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <Menu size={22} /> : <PanelLeft size={22} />}
          </button>

          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={18} />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="pl-11 pr-4 py-2.5 w-72 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-800/80 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center mr-2 space-x-1">
            <button className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all hover:shadow-sm">
              <MessageSquare size={20} />
            </button>
            <button className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all hover:shadow-sm">
              <HelpCircle size={20} />
            </button>
            <button className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all hover:shadow-sm">
              <Settings size={20} />
            </button>
          </div>

          {/* Theme Toggle - Prominently displayed */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-xl transition-all hover:shadow-sm",
              theme === 'light'
                ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            )}
            aria-label="Toggle theme"
            data-aos="fade-left"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative" data-aos="fade-left" data-aos-delay="100">
            <button
              className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-all hover:shadow-sm relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-error-500 ring-2 ring-white dark:ring-neutral-900"></span>
            </button>

            {/* Notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">New order received</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Order #12345 - Nike Air Max 2025</p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-warning-500 mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Low stock alert</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Samsung Galaxy S25 - Only 3 units remaining</p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">37 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 text-center">
                  <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div
            className="relative"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <button
              className="flex items-center ml-1 gap-2 p-1.5 pl-2 pr-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-medium shadow-sm">
                JS
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm">John Smith</span>
                  <ChevronDown size={16} />
                </div>
              </div>
            </button>

            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                  <p className="font-medium">John Smith</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">john.smith@example.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700">Profile</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700">Settings</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700">Help</button>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-700 py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-neutral-50 dark:hover:bg-neutral-700">Sign out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;