import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { MoreHorizontal } from 'lucide-react';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ProductDistributionChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  loading?: boolean;
}

const ProductDistributionChart: React.FC<ProductDistributionChartProps> = ({ data, loading = false }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}%`;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Product Distribution</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Distribution by product type
          </p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500">
          <MoreHorizontal size={18} />
        </button>
      </div>
      
      <div className="p-4 h-[300px] flex items-center justify-center">
        {loading ? (
          <div className="skeleton w-full h-full rounded-lg"></div>
        ) : (
          <Pie data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default ProductDistributionChart;
