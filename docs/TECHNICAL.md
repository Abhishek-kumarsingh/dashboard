# ShopDash Technical Documentation

This document provides detailed technical information about the ShopDash dashboard implementation, architecture, and customization options.

## Architecture Overview

ShopDash is built using a component-based architecture with React and TypeScript. The application is structured as follows:

```
src/
├── components/      # Reusable UI components
│   ├── dashboard/   # Dashboard-specific components
│   └── layout/      # Layout components (sidebar, navbar)
├── context/         # React context providers
├── data/            # Mock data
├── utils/           # Utility functions
```

### Key Components

#### Layout Components

- **Sidebar.tsx**: Collapsible sidebar with responsive behavior
  - Handles pinned/unpinned state
  - Manages submenu visibility
  - Adapts to different screen sizes

- **Navbar.tsx**: Top navigation bar
  - Includes sidebar toggle button
  - Theme switcher
  - User profile and notifications

#### Dashboard Components

- **StatCard.tsx**: Displays key metrics with trend indicators
- **Charts.tsx**: Contains various chart components using Chart.js
- **DataTable.tsx**: Responsive table for displaying tabular data
- **ActivityFeed.tsx**: Real-time activity updates
- **TodoList.tsx**: Task management component
- **SalesForecast.tsx**: Sales projection visualization
- **ProductDistributionChart.tsx**: Pie chart showing product type distribution
- **RegionalSalesChart.tsx**: Bar chart showing regional sales data

### Context Providers

- **ThemeContext.tsx**: Manages theme state (light/dark) and first visit detection

## Implementation Details

### Responsive Design

The dashboard uses Tailwind CSS for responsive design with a mobile-first approach:

- Mobile view: Single column layout with collapsible sidebar
- Tablet view: Two-column grid for stats and charts
- Desktop view: Multi-column layout with persistent sidebar option

### Sidebar Implementation

The sidebar implementation includes several key features:

1. **Content Shifting**: When the sidebar is open, the main content shifts right to avoid hiding content:
   ```tsx
   <div
     className={cn(
       "flex-1 h-screen overflow-y-auto transition-all duration-300 ease-in-out",
       sidebarOpen ? "lg:ml-72" : "ml-0",
       // Width calculation ensures content doesn't hide behind sidebar
       sidebarOpen ? "lg:w-[calc(100%-18rem)]" : "w-full"
     )}
   >
   ```

2. **First Visit Behavior**: Sidebar is closed by default on first visit:
   ```tsx
   const [sidebarPinned, setSidebarPinned] = useState(!isFirstVisit);
   ```

3. **Pin/Unpin Functionality**: Users can pin the sidebar to keep it open:
   ```tsx
   const togglePinned = () => {
     setSidebarPinned(prev => !prev);
     if (sidebarPinned) {
       // If currently pinned, unpinning should close the sidebar
       onClose();
     }
   };
   ```

### Chart Implementation

Charts are implemented using Chart.js with React wrappers:

```tsx
// Example of chart implementation
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
    // Additional configuration...
  },
};

return (
  <div className="h-[300px]">
    <Pie data={chartData} options={options} />
  </div>
);
```

### Animation System

Animations are implemented using the AOS (Animate On Scroll) library:

```tsx
// AOS initialization in main.tsx
function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50,
    });
  }, []);

  return null;
}
```

Components use AOS attributes for animations:
```tsx
<div 
  data-aos="fade-up"
  data-aos-delay={50 * index}
>
  {/* Component content */}
</div>
```

### Mock Data Structure

Mock data is organized in `mockData.ts` with separate exports for different data types:

```tsx
// Example of mock data structure
export const statCardData = [
  {
    id: 1,
    title: 'Total Revenue',
    value: 842795,
    prefix: '$',
    percentChange: 24.5,
    icon: DollarSign,
    // Additional properties...
  },
  // More items...
];

export const categorySalesData = {
  labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Sports', 'Books'],
  datasets: [{
    data: [35, 25, 15, 12, 8, 5],
    backgroundColor: [
      '#8b5cf6', // purple
      '#0ea5e9', // blue
      // More colors...
    ],
    borderWidth: 0,
  }]
};
```

## Customization Guide

### Adding a New Chart

1. Create a new chart component in `src/components/dashboard/`:

```tsx
import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, /* required elements */ } from 'chart.js';

// Register required Chart.js components
ChartJS.register(/* required elements */);

interface YourChartProps {
  data: {
    // Define your data structure
  };
  loading?: boolean;
}

const YourChart: React.FC<YourChartProps> = ({ data, loading = false }) => {
  const options = {
    // Chart options
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm h-full overflow-hidden">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="font-semibold">Your Chart Title</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Chart description
        </p>
      </div>
      
      <div className="p-4 h-[300px]">
        {loading ? (
          <div className="skeleton w-full h-full rounded-lg"></div>
        ) : (
          <Chart data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default YourChart;
```

2. Add mock data in `src/data/mockData.ts`:

```tsx
export const yourChartData = {
  labels: ['Label 1', 'Label 2', 'Label 3'],
  datasets: [{
    label: 'Dataset Label',
    data: [value1, value2, value3],
    backgroundColor: ['#color1', '#color2', '#color3'],
    // Additional properties...
  }]
};
```

3. Import and add to `App.tsx`:

```tsx
import YourChart from './components/dashboard/YourChart';
import { yourChartData } from './data/mockData';

// In the render function:
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
  <div>
    <YourChart data={yourChartData} loading={loading} />
  </div>
  {/* Other components */}
</div>
```

### Modifying the Theme

The theme system uses Tailwind CSS with a custom color palette defined in `tailwind.config.js`. To modify the theme:

1. Update the color palette in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f5f3ff',
        100: '#ede9fe',
        // Additional shades...
        600: '#7c3aed',
        700: '#6d28d9',
      },
      // Additional color definitions...
    },
  },
},
```

2. Use the defined colors in your components with Tailwind classes:

```tsx
<div className="bg-primary-600 text-white hover:bg-primary-700">
  Button Text
</div>
```

## Performance Considerations

- **Code Splitting**: Consider implementing code splitting for larger components
- **Memoization**: Use React.memo and useMemo for expensive calculations
- **Virtualization**: For long lists, implement virtualization to improve performance
- **Image Optimization**: Optimize images and use responsive image techniques

## Browser Compatibility

The dashboard is tested and compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

For older browsers, consider adding appropriate polyfills.
