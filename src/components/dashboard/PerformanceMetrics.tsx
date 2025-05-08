import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import RadialProgress from './RadialProgress';

interface PerformanceMetric {
  id: number;
  title: string;
  value: number;
  target: number;
  prefix?: string;
  suffix?: string;
  color: string;
}

interface PerformanceMetricsProps {
  metrics: PerformanceMetric[];
  loading?: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics, loading = false }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm h-full overflow-hidden">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Performance Metrics</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Key performance indicators
          </p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500">
          <MoreHorizontal size={18} />
        </button>
      </div>
      
      <div className="p-5">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="skeleton w-24 h-24 rounded-full mb-3"></div>
                <div className="skeleton h-5 w-24 rounded mb-1"></div>
                <div className="skeleton h-4 w-16 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex flex-col items-center">
                <RadialProgress
                  value={metric.value}
                  max={metric.target}
                  color={metric.color}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  size={100}
                  strokeWidth={8}
                />
                <h4 className="mt-3 text-sm font-medium text-center">{metric.title}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {metric.value}{metric.suffix} of {metric.target}{metric.suffix}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMetrics;
