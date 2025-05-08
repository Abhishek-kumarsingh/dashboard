import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import StatCard from './components/dashboard/StatCard';
import { RevenueChart, UserActivityChart, SalesDistributionChart } from './components/dashboard/Charts';
import ActivityFeed from './components/dashboard/ActivityFeed';
import DataTable from './components/dashboard/DataTable';
import CategorySalesChart from './components/dashboard/CategorySalesChart';
import TopProductsChart from './components/dashboard/TopProductsChart';
import PerformanceMetrics from './components/dashboard/PerformanceMetrics';
import TodoList from './components/dashboard/TodoList';
import QuickActions from './components/dashboard/QuickActions';
import SalesForecast from './components/dashboard/SalesForecast';
import TopSellingItems from './components/dashboard/TopSellingItems';
import SalesInsights from './components/dashboard/SalesInsights';
import ProductDistributionChart from './components/dashboard/ProductDistributionChart';
import RegionalSalesChart from './components/dashboard/RegionalSalesChart';
import { cn } from './utils/cn';
import {
  statCardData,
  activityData,
  orderData,
  orderColumns,
  categorySalesData,
  topProductsData,
  performanceKPIs,
  todoItems,
  quickActions,
  salesTrendData,
  productDistributionData,
  regionalSalesData
} from './data/mockData';
import { useTheme } from './context/ThemeContext';
import { Package, ShoppingBag, BarChart, Users, LineChart, MessageSquare } from 'lucide-react';

function App() {
  const { theme, isFirstVisit } = useTheme();
  // Initialize sidebar as closed, especially on first visit
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedStats, setSelectedStats] = useState<number[]>([1, 4, 7, 9, 11]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['sales', 'orders', 'users', 'shipments', 'messages']);

  // Function to handle sidebar toggle
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Function to close sidebar
  const closeSidebar = () => setSidebarOpen(false);

  // Function to open sidebar
  const openSidebar = () => setSidebarOpen(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Function to toggle a stat card's visibility
  const toggleStatCard = (id: number) => {
    setSelectedStats(prev =>
      prev.includes(id)
        ? prev.filter(statId => statId !== id)
        : [...prev, id]
    );
  };

  // Function to handle quick action clicks
  const handleQuickAction = (action: string) => {
    console.log(`Quick action clicked: ${action}`);
    // In a real app, this would navigate to the appropriate page or open a modal
  };

  // Close sidebar when clicking outside on mobile or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only apply this on mobile screens
      if (window.innerWidth < 1024 && sidebarOpen) {
        // Check if the click is outside the sidebar
        const sidebar = document.getElementById('main-sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          closeSidebar();
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-900">
      <Sidebar id="main-sidebar" isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content - shifts right when sidebar is open */}
      <div
        className={cn(
          "flex-1 h-screen overflow-y-auto transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-72" : "ml-0",
          // Add width calculation to ensure content doesn't hide behind sidebar
          sidebarOpen ? "lg:w-[calc(100%-18rem)]" : "w-full"
        )}
      >
        <Navbar onMenuClick={toggleSidebar} isSidebarOpen={sidebarOpen} />

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 pb-16 max-w-[1600px] mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
              <div>
                <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-200">
                  E-commerce Dashboard
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Welcome back! Here's an overview of your store's performance.
                </p>
              </div>

              <div className="flex gap-2">
                <button className="btn-primary text-sm py-2 px-4 rounded-xl shadow-sm">
                  <span className="hidden md:inline">Generate</span> Report
                </button>
                <button className="btn text-sm py-2 px-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
                  <span className="hidden md:inline">Customize</span> Dashboard
                </button>
              </div>
            </div>

            {/* First-time welcome message */}
            {isFirstVisit && (
              <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 rounded-xl p-4 mb-6 shadow-sm">
                <h3 className="font-medium text-primary-700 dark:text-primary-300 mb-1">Welcome to your new dashboard!</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  This is your personalized e-commerce dashboard. Explore the various metrics and customize it to your needs.
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions actions={quickActions} onActionClick={handleQuickAction} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {statCardData
              .filter(stat => selectedStats.includes(stat.id))
              .map((stat) => (
                <StatCard
                  key={stat.id}
                  id={stat.id}
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  percentChange={stat.percentChange}
                  icon={stat.icon}
                  iconColor={stat.iconColor}
                  iconBgColor={stat.iconBgColor}
                  decimals={stat.decimals}
                  loading={loading}
                  onToggle={toggleStatCard}
                />
            ))}

            {/* Add more stats button */}
            {selectedStats.length < statCardData.length && (
              <button
                className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:border-primary-400 dark:hover:border-primary-600 transition-colors h-full"
                onClick={() => {
                  // Find the first stat that's not selected
                  const availableStats = statCardData
                    .filter(stat => !selectedStats.includes(stat.id))
                    .map(stat => stat.id);

                  if (availableStats.length > 0) {
                    setSelectedStats([...selectedStats, availableStats[0]]);
                  }
                }}
              >
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500 dark:text-neutral-400">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Add Metric</span>
              </button>
            )}
          </div>

          {/* Sales Insights */}
          <div className="mb-6">
            <SalesInsights loading={loading} />
          </div>

          {/* Charts Section - Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <RevenueChart loading={loading} />
            </div>
            <div>
              <SalesForecast loading={loading} />
            </div>
          </div>

          {/* Charts Section - Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <CategorySalesChart data={categorySalesData} loading={loading} />
            </div>
            <div>
              <TopProductsChart data={topProductsData} loading={loading} />
            </div>
            <div>
              <PerformanceMetrics metrics={performanceKPIs} loading={loading} />
            </div>
          </div>

          {/* Activity, To-Do and User Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <TopSellingItems loading={loading} />
            </div>
            <div>
              <TodoList items={todoItems} loading={loading} />
            </div>
            <div>
              <ActivityFeed activities={activityData} loading={loading} />
            </div>
          </div>

          {/* Additional Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <ProductDistributionChart data={productDistributionData} loading={loading} />
            </div>
            <div>
              <RegionalSalesChart data={regionalSalesData} loading={loading} />
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Track and manage your latest customer orders
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50 transition-colors">
                  New Order
                </button>
                <button className="px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  Export
                </button>
              </div>
            </div>
            <div>
              <DataTable
                data={orderData}
                columns={orderColumns}
                loading={loading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;