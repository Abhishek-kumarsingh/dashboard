import React from 'react';
import { MoreHorizontal, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TopSellingItem {
  id: string;
  name: string;
  category: string;
  price: number;
  sales: number;
  change: number;
  image: string;
}

interface TopSellingItemsProps {
  items?: TopSellingItem[];
  loading?: boolean;
}

const defaultItems: TopSellingItem[] = [
  {
    id: 'item-1',
    name: 'iPhone 15 Pro Max',
    category: 'Electronics',
    price: 1299,
    sales: 1245,
    change: 12.5,
    image: 'https://placehold.co/60x60/8b5cf6/FFF?text=i15'
  },
  {
    id: 'item-2',
    name: 'Samsung Galaxy S25',
    category: 'Electronics',
    price: 1099,
    sales: 1120,
    change: 8.3,
    image: 'https://placehold.co/60x60/0ea5e9/FFF?text=S25'
  },
  {
    id: 'item-3',
    name: 'MacBook Air M3',
    category: 'Computers',
    price: 1299,
    sales: 980,
    change: 15.7,
    image: 'https://placehold.co/60x60/10b981/FFF?text=MBA'
  },
  {
    id: 'item-4',
    name: 'AirPods Pro 2',
    category: 'Audio',
    price: 249,
    sales: 875,
    change: -2.1,
    image: 'https://placehold.co/60x60/f59e0b/FFF?text=AP'
  },
  {
    id: 'item-5',
    name: 'iPad Pro 13"',
    category: 'Tablets',
    price: 1099,
    sales: 740,
    change: 5.8,
    image: 'https://placehold.co/60x60/ef4444/FFF?text=iPad'
  }
];

const TopSellingItems: React.FC<TopSellingItemsProps> = ({
  items = defaultItems,
  loading = false
}) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Top Selling Items</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Best performing products by revenue
          </p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-500">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="p-2">
        {loading ? (
          <div className="space-y-4 p-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="skeleton w-12 h-12 rounded-lg"></div>
                <div className="flex-1">
                  <div className="skeleton h-5 w-3/4 rounded mb-1"></div>
                  <div className="skeleton h-4 w-1/2 rounded"></div>
                </div>
                <div className="skeleton h-8 w-16 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-lg transition-all duration-200 cursor-pointer group"
                data-aos="fade-up"
                data-aos-delay={50 * index}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700 transition-transform group-hover:scale-105"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {item.category}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded-full">
                        ${item.price}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">{item.sales} units</div>
                    <div className={cn(
                      "flex items-center justify-end gap-0.5 text-xs",
                      item.change >= 0
                        ? "text-success-600 dark:text-success-400"
                        : "text-error-600 dark:text-error-400"
                    )}>
                      {item.change >= 0 ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      <span>{Math.abs(item.change)}%</span>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-500 dark:text-neutral-400">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 text-center">
        <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          View all products
        </button>
      </div>
    </div>
  );
};

export default TopSellingItems;
