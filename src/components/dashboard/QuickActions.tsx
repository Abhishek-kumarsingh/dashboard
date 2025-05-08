import React from 'react';
import { cn } from '../../utils/cn';
import { QuickAction } from '../../data/mockData';
import * as LucideIcons from 'lucide-react';

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick?: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  onActionClick = () => {}
}) => {
  const renderIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
    return <Icon size={24} />;
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="font-semibold">Quick Actions</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Frequently used actions and shortcuts
        </p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-sm transition-all"
              onClick={() => onActionClick(action.action)}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
                action.bgColor
              )}>
                <span className={action.color}>
                  {renderIcon(action.icon)}
                </span>
              </div>
              <span className="text-sm font-medium text-center">{action.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
