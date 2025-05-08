import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { MoreHorizontal, TrendingUp, ArrowUpRight, Calendar } from 'lucide-react';
import { cn } from '../../utils/cn';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesForecastProps {
  loading?: boolean;
}

const SalesForecast: React.FC<SalesForecastProps> = ({ loading = false }) => {
  // Sample forecast data
  const forecastData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Forecast',
        data: [85000, 87500, 92000, 95500, 98000, 103000],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Actual',
        data: [85000, 88200, 93500, 97000],
        borderColor: '#10b981',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          callback: function(value: any) {
            return '$' + (value / 1000) + 'k';
          },
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  // Growth metrics
  const growthMetrics = [
    { label: 'Weekly Growth', value: '5.2%', trend: 'up', color: 'text-success-600 dark:text-success-400' },
    { label: 'Monthly Projection', value: '$412k', trend: 'up', color: 'text-primary-600 dark:text-primary-400' },
    { label: 'Quarterly Target', value: '92%', trend: 'up', color: 'text-accent-600 dark:text-accent-400' },
  ];

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Sales Forecast</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Projected revenue for the next 6 weeks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500">
            <Calendar size={18} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="skeleton w-full h-[200px] rounded-lg"></div>
        ) : (
          <>
            <div className="flex flex-wrap gap-4 mb-4">
              {growthMetrics.map((metric, index) => (
                <div key={index} className="bg-neutral-50 dark:bg-neutral-800/80 rounded-lg p-3 flex-1 min-w-[120px] border border-neutral-200 dark:border-neutral-700 transition-all hover:shadow-sm">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{metric.label}</p>
                  <div className="flex items-center gap-1">
                    <span className={cn("text-lg font-semibold", metric.color)}>{metric.value}</span>
                    {metric.trend === 'up' && (
                      <ArrowUpRight size={16} className="text-success-500 dark:text-success-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[200px]">
              <Line data={forecastData} options={options} />
            </div>

            <div className="flex justify-between items-center mt-4 text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-primary-500"></span>
                  <span className="text-neutral-600 dark:text-neutral-400">Forecast</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-success-500"></span>
                  <span className="text-neutral-600 dark:text-neutral-400">Actual</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium">
                <TrendingUp size={16} />
                <span>8.5% YoY Growth</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesForecast;
