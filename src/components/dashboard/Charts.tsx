import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  loading = false
}) => {
  return (
    <div
      className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-5 h-full transition-all duration-300 hover:shadow-md"
      data-aos="fade-up"
    >
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          {subtitle && <p className="text-neutral-500 dark:text-neutral-400 text-sm">{subtitle}</p>}
        </div>
        <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <div className="skeleton w-full h-full rounded-lg"></div>
        </div>
      ) : (
        <div className="w-full">
          {children}
        </div>
      )}
    </div>
  );
};

export const RevenueChart: React.FC<{ loading?: boolean }> = ({ loading = false }) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  });

  useEffect(() => {
    // Simulate data loading
    if (!loading) {
      const timer = setTimeout(() => {
        setChartData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [12500, 19200, 15700, 25600, 21300, 38200],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fill: true,
            tension: 0.4,
          }]
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: theme === 'dark' ? '#262626' : 'white',
        titleColor: theme === 'dark' ? '#e5e5e5' : '#262626',
        bodyColor: theme === 'dark' ? '#e5e5e5' : '#262626',
        borderColor: theme === 'dark' ? '#404040' : '#e5e5e5',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#a3a3a3' : '#525252',
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? '#262626' : '#e5e5e5',
        },
        ticks: {
          color: theme === 'dark' ? '#a3a3a3' : '#525252',
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <ChartCard
      title="Revenue Over Time"
      subtitle="Monthly revenue for the current year"
      loading={loading}
    >
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>
    </ChartCard>
  );
};

export const UserActivityChart: React.FC<{ loading?: boolean }> = ({ loading = false }) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Active Users',
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#0ea5e9',
    }]
  });

  useEffect(() => {
    // Simulate data loading
    if (!loading) {
      const timer = setTimeout(() => {
        setChartData({
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Active Users',
            data: [1250, 980, 1340, 1670, 1490, 870, 760],
            backgroundColor: '#0ea5e9',
          }]
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#262626' : 'white',
        titleColor: theme === 'dark' ? '#e5e5e5' : '#262626',
        bodyColor: theme === 'dark' ? '#e5e5e5' : '#262626',
        borderColor: theme === 'dark' ? '#404040' : '#e5e5e5',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#a3a3a3' : '#525252',
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? '#262626' : '#e5e5e5',
        },
        ticks: {
          color: theme === 'dark' ? '#a3a3a3' : '#525252',
        },
      },
    },
  };

  return (
    <ChartCard
      title="User Activity"
      subtitle="Daily active users this week"
      loading={loading}
    >
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </ChartCard>
  );
};

export const SalesDistributionChart: React.FC<{ loading?: boolean }> = ({ loading = false }) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState({
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ['#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b'],
      borderWidth: 0,
    }]
  });

  useEffect(() => {
    // Simulate data loading
    if (!loading) {
      const timer = setTimeout(() => {
        setChartData({
          labels: ['Product A', 'Product B', 'Product C', 'Product D'],
          datasets: [{
            data: [42, 27, 18, 13],
            backgroundColor: ['#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b'],
            borderWidth: 0,
          }]
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          color: theme === 'dark' ? '#e5e5e5' : '#262626',
        },
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#262626' : 'white',
        titleColor: theme === 'dark' ? '#e5e5e5' : '#262626',
        bodyColor: theme === 'dark' ? '#e5e5e5' : '#262626',
        borderColor: theme === 'dark' ? '#404040' : '#e5e5e5',
        borderWidth: 1,
      },
    },
  };

  return (
    <ChartCard
      title="Sales Distribution"
      subtitle="Product sales breakdown"
      loading={loading}
    >
      <div style={{ height: '300px' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </ChartCard>
  );
};