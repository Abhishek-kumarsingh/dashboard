import React, { useState } from 'react';
import { DivideIcon as LucideIcon, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import CountUp from 'react-countup';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  percentChange?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  duration?: number;
  decimals?: number;
  loading?: boolean;
  onToggle?: (id: number) => void;
  id?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  percentChange,
  icon: Icon,
  iconColor = 'text-primary-600 dark:text-primary-400',
  iconBgColor = 'bg-primary-100 dark:bg-primary-900/50',
  duration = 2,
  decimals = 0,
  loading = false,
  onToggle,
  id
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="bg-white dark:bg-neutral-800 p-5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all duration-300 relative group"
      data-aos="fade-up"
    >
      {/* Menu button (visible on hover) */}
      {onToggle && id && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            <MoreHorizontal size={16} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-10">
              <button
                className="w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onClick={() => {
                  onToggle(id);
                  setShowMenu(false);
                }}
              >
                Hide this card
              </button>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <>
          <div className="flex justify-between items-start mb-4">
            <div className="skeleton h-6 w-24 rounded"></div>
            <div className="skeleton h-10 w-10 rounded-lg"></div>
          </div>
          <div className="skeleton h-8 w-36 rounded mb-2"></div>
          <div className="skeleton h-5 w-20 rounded"></div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">{title}</h3>
            <div className={cn(
              "p-2.5 rounded-xl shadow-sm",
              iconBgColor
            )}>
              <Icon className={iconColor} size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold mb-2">
            {prefix}
            <CountUp
              end={value}
              duration={duration}
              decimals={decimals}
              separator=","
            />
            {suffix}
          </div>
          {percentChange !== undefined && (
            <div className="flex items-center gap-1">
              <div className={cn(
                "flex items-center text-sm font-medium gap-0.5",
                percentChange >= 0
                  ? "text-success-600 dark:text-success-400"
                  : "text-error-600 dark:text-error-400"
              )}>
                {percentChange >= 0 ? (
                  <ArrowUpRight size={16} className="stroke-2" />
                ) : (
                  <ArrowDownRight size={16} className="stroke-2" />
                )}
                <span>{Math.abs(percentChange)}%</span>
              </div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">from last month</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StatCard;