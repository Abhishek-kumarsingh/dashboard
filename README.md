# ShopDash - Modern E-commerce Dashboard

![ShopDash Dashboard](https://placehold.co/1200x630/8b5cf6/FFF?text=ShopDash+Dashboard)

ShopDash is a modern, responsive e-commerce dashboard built with React, TypeScript, and Tailwind CSS. It provides a comprehensive interface for managing an online store with real-time analytics, order management, and inventory tracking.

## Features

### Dashboard Layout
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Light/Dark Mode**: Toggle between light and dark themes
- **Interactive Sidebar**: Collapsible sidebar that shifts content appropriately
- **First Visit Experience**: Special welcome message for first-time users

### Dashboard Components
- **Summary Cards**: Key metrics with animations and trend indicators
- **Data Visualizations**: Various chart types including:
  - Revenue charts (line)
  - Sales distribution (doughnut)
  - Product performance (bar)
  - Regional sales (bar)
  - Product distribution (pie)
  - Sales forecast with projections
- **Activity Feed**: Real-time updates on store activities
- **To-Do List**: Task management for store operations
- **Quick Action Buttons**: Shortcuts to common tasks
- **Orders Table**: Comprehensive order management

### Interactive Elements
- **Hover Effects**: Cards and buttons with hover animations
- **Loading States**: Skeleton loading states for all components
- **Responsive Tables**: Tables that adapt to different screen sizes
- **Sortable Data**: Sort functionality for tabular data

## Tech Stack

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Data visualization
- **Lucide Icons**: Modern icon set
- **AOS**: Animate On Scroll library for animations
- **Vite**: Build tool and development server

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopdash.git
   cd shopdash
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

## Project Structure

```
shopdash/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   └── layout/      # Layout components (sidebar, navbar)
│   ├── context/         # React context providers
│   ├── data/            # Mock data for development
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## Dashboard Features

### Sidebar
- Collapsible sidebar with smooth transitions
- Closed by default on first visit
- Content shifts right when sidebar is open (no content hiding behind)
- Submenu support for nested navigation

### Charts and Data Visualization
- **Revenue Chart**: Shows revenue trends over time
- **Sales Forecast**: Projected revenue with growth metrics
- **Category Sales**: Distribution of sales by product category
- **Top Products**: Best-performing products by units sold
- **Performance Metrics**: KPIs with visual indicators
- **Product Distribution**: Breakdown of products by type
- **Regional Sales**: Sales performance by geographic region

### Mock Data
The dashboard includes comprehensive mock data for development and demonstration:
- Sales and revenue statistics
- Order information
- Customer data
- Product performance
- Activity logs
- Task lists

## Customization

### Themes
The dashboard supports both light and dark modes. The theme can be toggled via the navbar.

### Dashboard Layout
The dashboard layout can be customized by:
- Adding/removing stat cards
- Rearranging chart components
- Modifying the grid layout in `App.tsx`

### Adding New Components
To add a new component:
1. Create the component in `src/components/dashboard/`
2. Add any required mock data in `src/data/mockData.ts`
3. Import and add the component to the layout in `App.tsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern admin dashboards
- Icons provided by [Lucide Icons](https://lucide.dev/)
- Chart components powered by [Chart.js](https://www.chartjs.org/)
