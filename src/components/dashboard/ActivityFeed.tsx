import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { MoreHorizontal, CheckCircle2, AlertTriangle, XCircle, InfoIcon } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description: string;
  time: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  loading?: boolean;
}

const ActivityIcon: React.FC<{ type: ActivityItem['type'] }> = ({ type }) => {
  const iconMap = {
    success: <CheckCircle2 size={18} className="text-success-500 dark:text-success-400" />,
    warning: <AlertTriangle size={18} className="text-warning-500 dark:text-warning-400" />,
    error: <XCircle size={18} className="text-error-500 dark:text-error-400" />,
    info: <InfoIcon size={18} className="text-accent-500 dark:text-accent-400" />,
  };

  const bgColorClasses = {
    success: 'bg-success-50 dark:bg-success-900/20',
    warning: 'bg-warning-50 dark:bg-warning-900/20',
    error: 'bg-error-50 dark:bg-error-900/20',
    info: 'bg-accent-50 dark:bg-accent-900/20',
  };

  return (
    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', bgColorClasses[type])}>
      {iconMap[type]}
    </div>
  );
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, loading = false }) => {
  const [filter, setFilter] = useState<ActivityItem['type'] | 'all'>('all');

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(activity => activity.type === filter);

  return (
    <div
      className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 h-full overflow-hidden"
      data-aos="fade-up"
    >
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <h3 className="font-semibold">Recent Activity</h3>
        <div className="relative group">
          <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex px-5 pt-3 border-b border-neutral-200 dark:border-neutral-700">
        <button
          className={cn(
            "px-3 py-2 text-sm font-medium border-b-2 transition-colors",
            filter === 'all'
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          )}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={cn(
            "px-3 py-2 text-sm font-medium border-b-2 transition-colors",
            filter === 'success'
              ? "border-success-500 text-success-600 dark:text-success-400"
              : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          )}
          onClick={() => setFilter('success')}
        >
          Success
        </button>
        <button
          className={cn(
            "px-3 py-2 text-sm font-medium border-b-2 transition-colors",
            filter === 'warning'
              ? "border-warning-500 text-warning-600 dark:text-warning-400"
              : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          )}
          onClick={() => setFilter('warning')}
        >
          Alerts
        </button>
      </div>

      {loading ? (
        <div className="p-5 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="skeleton w-8 h-8 rounded-full"></div>
              <div className="flex-1">
                <div className="skeleton h-5 w-3/4 rounded mb-1"></div>
                <div className="skeleton h-4 w-full rounded mb-1"></div>
                <div className="skeleton h-3 w-24 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5 space-y-4 max-h-[350px] overflow-y-auto">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 p-2 rounded-lg transition-colors cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={50 * index}
              >
                <ActivityIcon type={activity.type} />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">{activity.description}</p>
                  <span className="text-neutral-500 dark:text-neutral-500 text-xs">{activity.time}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
              <p>No activities found</p>
            </div>
          )}
        </div>
      )}

      <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 text-center">
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;