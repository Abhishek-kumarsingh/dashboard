import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  ArrowUpRight,
  ShoppingCart,
  Truck,
  Star,
  Repeat,
  UserPlus,
  CircleDollarSign,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';

// Stat card data
export const statCardData = [
  // Sales/Revenue
  {
    id: 1,
    title: 'Total Revenue',
    value: 842795,
    prefix: '$',
    percentChange: 24.5,
    icon: DollarSign,
    iconColor: 'text-primary-600 dark:text-primary-400',
    iconBgColor: 'bg-primary-100 dark:bg-primary-900/50',
    category: 'sales',
  },
  {
    id: 2,
    title: 'Average Order Value',
    value: 285,
    prefix: '$',
    percentChange: 8.7,
    icon: CircleDollarSign,
    iconColor: 'text-success-600 dark:text-success-400',
    iconBgColor: 'bg-success-100 dark:bg-success-900/50',
    category: 'sales',
  },
  {
    id: 3,
    title: 'Monthly Sales',
    value: 156480,
    prefix: '$',
    percentChange: 15.3,
    icon: LineChart,
    iconColor: 'text-violet-600 dark:text-violet-400',
    iconBgColor: 'bg-violet-100 dark:bg-violet-900/50',
    category: 'sales',
  },

  // Orders/Inventory
  {
    id: 4,
    title: 'Total Orders',
    value: 4385,
    percentChange: 12.3,
    icon: ShoppingBag,
    iconColor: 'text-accent-600 dark:text-accent-400',
    iconBgColor: 'bg-accent-100 dark:bg-accent-900/50',
    category: 'orders',
  },
  {
    id: 5,
    title: 'Inventory Items',
    value: 1247,
    percentChange: 3.8,
    icon: Package,
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBgColor: 'bg-amber-100 dark:bg-amber-900/50',
    category: 'inventory',
  },
  {
    id: 6,
    title: 'Low Stock Items',
    value: 28,
    percentChange: -12.5,
    icon: AlertTriangle,
    iconColor: 'text-error-600 dark:text-error-400',
    iconBgColor: 'bg-error-100 dark:bg-error-900/50',
    category: 'inventory',
  },

  // Users
  {
    id: 7,
    title: 'Active Customers',
    value: 12547,
    percentChange: 18.2,
    icon: Users,
    iconColor: 'text-secondary-600 dark:text-secondary-400',
    iconBgColor: 'bg-secondary-100 dark:bg-secondary-900/50',
    category: 'users',
  },
  {
    id: 8,
    title: 'New Customers',
    value: 847,
    percentChange: 15.8,
    icon: UserPlus,
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    iconBgColor: 'bg-indigo-100 dark:bg-indigo-900/50',
    category: 'users',
  },

  // Shipments/Deliveries
  {
    id: 9,
    title: 'Pending Shipments',
    value: 156,
    percentChange: 5.4,
    icon: Truck,
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBgColor: 'bg-blue-100 dark:bg-blue-900/50',
    category: 'shipments',
  },
  {
    id: 10,
    title: 'Delivered Orders',
    value: 3842,
    percentChange: 14.2,
    icon: CheckCircle2,
    iconColor: 'text-green-600 dark:text-green-400',
    iconBgColor: 'bg-green-100 dark:bg-green-900/50',
    category: 'shipments',
  },

  // Messages/Reviews
  {
    id: 11,
    title: 'New Messages',
    value: 48,
    percentChange: 22.5,
    icon: MessageSquare,
    iconColor: 'text-pink-600 dark:text-pink-400',
    iconBgColor: 'bg-pink-100 dark:bg-pink-900/50',
    category: 'messages',
  },
  {
    id: 12,
    title: 'Customer Reviews',
    value: 1285,
    percentChange: 8.9,
    icon: Star,
    iconColor: 'text-warning-600 dark:text-warning-400',
    iconBgColor: 'bg-warning-100 dark:bg-warning-900/50',
    category: 'reviews',
  },

  // Performance metrics
  {
    id: 13,
    title: 'Conversion Rate',
    value: 4.28,
    suffix: '%',
    percentChange: 5.7,
    icon: TrendingUp,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBgColor: 'bg-emerald-100 dark:bg-emerald-900/50',
    decimals: 2,
    category: 'performance',
  },
  {
    id: 14,
    title: 'Return Rate',
    value: 2.3,
    suffix: '%',
    percentChange: -1.5,
    icon: Repeat,
    iconColor: 'text-orange-600 dark:text-orange-400',
    iconBgColor: 'bg-orange-100 dark:bg-orange-900/50',
    decimals: 1,
    category: 'performance',
  },
  {
    id: 15,
    title: 'Customer Satisfaction',
    value: 4.8,
    suffix: '/5',
    percentChange: 2.1,
    icon: Star,
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    iconBgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
    decimals: 1,
    category: 'performance',
  },
];

// Activity feed data
export const activityData = [
  {
    id: '1',
    type: 'success',
    title: 'New order received',
    description: 'Order #12345 - Nike Air Max 2025 - $199.99',
    time: '2 minutes ago',
  },
  {
    id: '2',
    type: 'info',
    title: 'Product stock update',
    description: 'iPhone 15 Pro - 24 units added to inventory',
    time: '15 minutes ago',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Low stock alert',
    description: 'Samsung Galaxy S25 - Only 3 units remaining',
    time: '37 minutes ago',
  },
  {
    id: '4',
    type: 'success',
    title: 'New customer milestone',
    description: 'Reached 12,500 registered customers!',
    time: '45 minutes ago',
  },
  {
    id: '5',
    type: 'error',
    title: 'Failed delivery',
    description: 'Order #12342 delivery attempt failed - customer unavailable',
    time: '1 hour ago',
  },
  {
    id: '6',
    type: 'success',
    title: 'Product review',
    description: '5-star review received for MacBook Pro M3',
    time: '2 hours ago',
  },
  {
    id: '7',
    type: 'info',
    title: 'Price update',
    description: 'Summer collection prices updated - 20% off',
    time: '3 hours ago',
  },
];

// Order data
export interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: 'completed' | 'processing' | 'failed' | 'refunded' | 'shipped';
  date: string;
  items: number;
  shipping: string;
}

export const orderData: Order[] = [
  {
    id: 'ORD-9385',
    customer: 'Emma Thompson',
    email: 'emma.t@example.com',
    amount: 1299.99,
    status: 'completed',
    date: '2025-04-15',
    items: 2,
    shipping: 'Express'
  },
  {
    id: 'ORD-9384',
    customer: 'James Wilson',
    email: 'james.w@example.com',
    amount: 849.95,
    status: 'shipped',
    date: '2025-04-15',
    items: 3,
    shipping: 'Standard'
  },
  {
    id: 'ORD-9383',
    customer: 'Sophia Chen',
    email: 'sophia.c@example.com',
    amount: 2499.99,
    status: 'processing',
    date: '2025-04-14',
    items: 1,
    shipping: 'Express'
  },
  {
    id: 'ORD-9382',
    customer: 'Lucas Martinez',
    email: 'lucas.m@example.com',
    amount: 199.99,
    status: 'failed',
    date: '2025-04-14',
    items: 1,
    shipping: 'Standard'
  },
  {
    id: 'ORD-9381',
    customer: 'Isabella Kim',
    email: 'isabella.k@example.com',
    amount: 3299.99,
    status: 'refunded',
    date: '2025-04-13',
    items: 4,
    shipping: 'Express'
  },
  {
    id: 'ORD-9380',
    customer: 'Oliver Brown',
    email: 'oliver.b@example.com',
    amount: 749.95,
    status: 'completed',
    date: '2025-04-13',
    items: 2,
    shipping: 'Standard'
  },
  {
    id: 'ORD-9379',
    customer: 'Ava Williams',
    email: 'ava.w@example.com',
    amount: 1899.99,
    status: 'shipped',
    date: '2025-04-12',
    items: 3,
    shipping: 'Express'
  },
  {
    id: 'ORD-9378',
    customer: 'Ethan Johnson',
    email: 'ethan.j@example.com',
    amount: 899.95,
    status: 'completed',
    date: '2025-04-12',
    items: 2,
    shipping: 'Standard'
  },
  {
    id: 'ORD-9377',
    customer: 'Mia Garcia',
    email: 'mia.g@example.com',
    amount: 1499.99,
    status: 'processing',
    date: '2025-04-11',
    items: 1,
    shipping: 'Express'
  },
  {
    id: 'ORD-9376',
    customer: 'Noah Wilson',
    email: 'noah.w@example.com',
    amount: 349.95,
    status: 'shipped',
    date: '2025-04-11',
    items: 3,
    shipping: 'Standard'
  },
  {
    id: 'ORD-9375',
    customer: 'Emma Taylor',
    email: 'emma.t@example.com',
    amount: 2199.99,
    status: 'completed',
    date: '2025-04-10',
    items: 2,
    shipping: 'Express'
  },
  {
    id: 'ORD-9374',
    customer: 'Liam Anderson',
    email: 'liam.a@example.com',
    amount: 599.95,
    status: 'failed',
    date: '2025-04-10',
    items: 1,
    shipping: 'Standard'
  },
];

export const orderColumns = [
  {
    header: 'Order ID',
    accessorKey: 'id' as keyof Order,
    sortable: true,
  },
  {
    header: 'Customer',
    accessorKey: 'customer' as keyof Order,
    sortable: true,
  },
  {
    header: 'Items',
    accessorKey: 'items' as keyof Order,
    sortable: true,
  },
  {
    header: 'Amount',
    accessorKey: 'amount' as keyof Order,
    sortable: true,
    cell: (order: Order) => `$${order.amount.toFixed(2)}`,
  },
  {
    header: 'Shipping',
    accessorKey: 'shipping' as keyof Order,
    sortable: true,
  },
  {
    header: 'Status',
    accessorKey: 'status' as keyof Order,
    sortable: true,
    cell: (order: Order) => {
      const statusStyles = {
        completed: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
        processing: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
        failed: 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400',
        refunded: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400',
        shipped: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
      };

      const capitalizedStatus = order.status.charAt(0).toUpperCase() + order.status.slice(1);
      return `<span class="inline-block px-2 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}">${capitalizedStatus}</span>`;
    },
  },
  {
    header: 'Date',
    accessorKey: 'date' as keyof Order,
    sortable: true,
    cell: (order: Order) => new Date(order.date).toLocaleDateString(),
  },
];

// Sales trend data (monthly)
export const salesTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      data: [42500, 47800, 51200, 56700, 48900, 53200, 58700, 62300, 59800, 73400, 79200, 84300],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Orders',
      data: [320, 350, 380, 410, 390, 405, 425, 450, 440, 480, 510, 540],
      borderColor: '#10b981',
      backgroundColor: 'transparent',
      borderDash: [5, 5],
      tension: 0.4,
    }
  ]
};

// Category sales data (for pie chart)
export const categorySalesData = {
  labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Sports', 'Books'],
  datasets: [{
    data: [35, 25, 15, 12, 8, 5],
    backgroundColor: [
      '#8b5cf6', // purple
      '#0ea5e9', // blue
      '#10b981', // green
      '#f59e0b', // amber
      '#ef4444', // red
      '#6366f1', // indigo
    ],
    borderWidth: 0,
  }]
};

// Top selling products (for bar chart)
export const topProductsData = {
  labels: ['iPhone 15 Pro', 'Samsung S25', 'MacBook Air M3', 'AirPods Pro', 'iPad Pro'],
  datasets: [{
    label: 'Units Sold',
    data: [1245, 1120, 980, 875, 740],
    backgroundColor: '#0ea5e9',
  }]
};

// Performance KPIs (for radial progress)
export const performanceKPIs = [
  {
    id: 1,
    title: 'Sales Target',
    value: 78,
    target: 100,
    prefix: '$',
    suffix: 'k',
    color: '#8b5cf6',
  },
  {
    id: 2,
    title: 'Customer Retention',
    value: 92,
    target: 100,
    suffix: '%',
    color: '#10b981',
  },
  {
    id: 3,
    title: 'Inventory Turnover',
    value: 65,
    target: 100,
    suffix: '%',
    color: '#0ea5e9',
  },
  {
    id: 4,
    title: 'Support Response',
    value: 85,
    target: 100,
    suffix: '%',
    color: '#f59e0b',
  },
];

// To-Do List
export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: string;
}

export const todoItems: TodoItem[] = [
  {
    id: 'todo-1',
    title: 'Review inventory levels',
    description: 'Check stock levels for top-selling products and reorder if necessary',
    priority: 'high',
    completed: false,
    dueDate: '2025-04-18',
  },
  {
    id: 'todo-2',
    title: 'Approve new product listings',
    description: 'Review and approve 15 new product submissions from vendors',
    priority: 'medium',
    completed: false,
    dueDate: '2025-04-19',
  },
  {
    id: 'todo-3',
    title: 'Respond to customer inquiries',
    description: 'Address 5 pending customer support tickets',
    priority: 'high',
    completed: false,
    dueDate: '2025-04-17',
  },
  {
    id: 'todo-4',
    title: 'Prepare monthly sales report',
    description: 'Compile data and create report for management review',
    priority: 'medium',
    completed: true,
    dueDate: '2025-04-15',
  },
  {
    id: 'todo-5',
    title: 'Update shipping rates',
    description: 'Adjust shipping rates based on new carrier agreements',
    priority: 'low',
    completed: false,
    dueDate: '2025-04-22',
  },
];

// Quick Actions
export interface QuickAction {
  id: string;
  title: string;
  icon: keyof typeof import('lucide-react');
  color: string;
  bgColor: string;
  action: string;
}

export const quickActions: QuickAction[] = [
  {
    id: 'action-1',
    title: 'Add Product',
    icon: 'Package',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    action: 'add-product',
  },
  {
    id: 'action-2',
    title: 'Create Order',
    icon: 'ShoppingBag',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    action: 'create-order',
  },
  {
    id: 'action-3',
    title: 'Generate Report',
    icon: 'BarChart',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    action: 'generate-report',
  },
  {
    id: 'action-4',
    title: 'Manage Users',
    icon: 'Users',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    action: 'manage-users',
  },
  {
    id: 'action-5',
    title: 'View Analytics',
    icon: 'LineChart',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    action: 'view-analytics',
  },
  {
    id: 'action-6',
    title: 'Send Message',
    icon: 'MessageSquare',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    action: 'send-message',
  },
];

// Product distribution data (for pie chart)
export const productDistributionData = {
  labels: ['Smartphones', 'Laptops', 'Accessories', 'Tablets', 'Wearables'],
  datasets: [{
    data: [32, 25, 20, 13, 10],
    backgroundColor: [
      '#8b5cf6', // purple
      '#0ea5e9', // blue
      '#10b981', // green
      '#f59e0b', // amber
      '#ef4444', // red
    ],
    borderWidth: 0,
  }]
};

// Regional sales data (for bar chart)
export const regionalSalesData = {
  labels: ['North America', 'Europe', 'Asia', 'Australia', 'South America', 'Africa'],
  datasets: [
    {
      label: 'Current Year',
      data: [125000, 98000, 87500, 56000, 42000, 28000],
      backgroundColor: [
        '#8b5cf6', // purple
        '#0ea5e9', // blue
        '#10b981', // green
        '#f59e0b', // amber
        '#ef4444', // red
        '#6366f1', // indigo
      ],
      borderRadius: 4,
    },
    {
      label: 'Previous Year',
      data: [105000, 82000, 72500, 48000, 36000, 22000],
      backgroundColor: [
        'rgba(139, 92, 246, 0.5)', // purple with opacity
        'rgba(14, 165, 233, 0.5)', // blue with opacity
        'rgba(16, 185, 129, 0.5)', // green with opacity
        'rgba(245, 158, 11, 0.5)', // amber with opacity
        'rgba(239, 68, 68, 0.5)', // red with opacity
        'rgba(99, 102, 241, 0.5)', // indigo with opacity
      ],
      borderRadius: 4,
    }
  ]
};