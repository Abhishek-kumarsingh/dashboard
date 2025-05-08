import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, ExternalLink, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SalesInsight {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  color: string;
  bgColor: string;
  icon?: React.ReactNode;
  alert?: boolean;
}

interface SalesInsightsProps {
  insights?: SalesInsight[];
  loading?: boolean;
}

const defaultInsights: SalesInsight[] = [
  {
    id: 'insight-1',
    title: 'Conversion Rate',
    value: '4.28%',
    change: 5.7,
    trend: 'up',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    icon: <TrendingUp size={18} />
  },
  {
    id: 'insight-2',
    title: 'Avg. Order Value',
    value: '$285',
    change: 8.7,
    trend: 'up',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: 'insight-3',
    title: 'Cart Abandonment',
    value: '21.3%',
    change: -2.5,
    trend: 'down',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    id: 'insight-4',
    title: 'Low Stock Items',
    value: '28',
    change: 12.5,
    trend: 'up',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    alert: true,
    icon: <AlertTriangle size={18} />
  }
];

const SalesInsights: React.FC<SalesInsightsProps> = ({
  insights = defaultInsights,
  loading = false
}) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Sales Insights</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Key metrics and trends
          </p>
        </div>
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
          <span>View all</span>
          <ExternalLink size={14} />
        </button>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4">
                <div className="skeleton h-5 w-24 rounded mb-2"></div>
                <div className="skeleton h-7 w-16 rounded mb-2"></div>
                <div className="skeleton h-4 w-20 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-sm group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                    {insight.title}
                  </h4>
                  {insight.alert && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {insight.value}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={cn(
                        "flex items-center text-xs font-medium",
                        insight.trend === 'up'
                          ? "text-success-600 dark:text-success-400"
                          : "text-error-600 dark:text-error-400"
                      )}>
                        {insight.trend === 'up' ? (
                          <ArrowUpRight size={14} className="stroke-2" />
                        ) : (
                          <ArrowDownRight size={14} className="stroke-2" />
                        )}
                        <span>{Math.abs(insight.change)}%</span>
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">vs last month</span>
                    </div>
                  </div>

                  {insight.icon && (
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      insight.bgColor
                    )}>
                      <span className={insight.color}>
                        {insight.icon}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesInsights;
