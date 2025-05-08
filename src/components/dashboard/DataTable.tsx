import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search as SearchIcon,
  Filter,
  MoreHorizontal,
  Download,
  RefreshCw,
  Eye
} from 'lucide-react';
import { cn } from '../../utils/cn';

type SortDirection = 'asc' | 'desc' | null;

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
}

function DataTable<T extends { id: string }>({
  data,
  columns,
  loading = false
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  // Handle sorting
  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(prev => {
        if (prev === 'asc') return 'desc';
        if (prev === 'desc') return null;
        return 'asc';
      });
      if (sortDirection === 'desc') {
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filter data based on search query
  const filteredData = searchQuery
    ? data.filter(item =>
        Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : data;

  // Sort data
  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
        if (a[sortColumn] === b[sortColumn]) return 0;

        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      })
    : filteredData;

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div data-aos="fade-up">
      <div className="flex flex-col md:flex-row justify-between mb-4 items-start md:items-center gap-3">
        <div className="relative w-full md:w-64">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-neutral-500" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors">
            <Filter size={16} />
          </button>
          <button className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors">
            <RefreshCw size={16} />
          </button>
          <button className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors">
            <Download size={16} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50 font-medium text-sm transition-colors">
            <Eye size={16} />
            <span>View All</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-neutral-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400",
                    column.sortable && "cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                  )}
                  onClick={() => column.sortable && handleSort(column.accessorKey)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && (
                      <div className="flex flex-col ml-1">
                        <ChevronUp size={10} className={cn(
                          "text-neutral-400 -mb-1",
                          sortColumn === column.accessorKey && sortDirection === 'asc' && "text-primary-500"
                        )} />
                        <ChevronDown size={10} className={cn(
                          "text-neutral-400",
                          sortColumn === column.accessorKey && sortDirection === 'desc' && "text-primary-500"
                        )} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              <th className="w-10 px-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <tr key={index}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-4 text-sm">
                      <div className="skeleton h-5 w-24 rounded"></div>
                    </td>
                  ))}
                  <td className="w-10 px-2">
                    <div className="skeleton h-5 w-5 rounded"></div>
                  </td>
                </tr>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors group"
                  data-aos="fade-up"
                  data-aos-delay={50 * index}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-4 text-sm">
                      <div dangerouslySetInnerHTML={
                        column.cell
                          ? { __html: column.cell(item) as string }
                          : { __html: String(item[column.accessorKey]) }
                      } />
                    </td>
                  ))}
                  <td className="w-10 px-2">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-neutral-500 dark:text-neutral-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <SearchIcon className="h-8 w-8 text-neutral-300 dark:text-neutral-600" />
                    <p>No results found</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">Try adjusting your search or filter to find what you're looking for</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-1">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing {paginatedData.length} of {sortedData.length} results
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(
                "p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors",
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
              )}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                // Show first page, last page, current page, and pages around current
                let pageToShow: number | null = null;

                if (totalPages <= 5) {
                  // If 5 or fewer pages, show all
                  pageToShow = i + 1;
                } else if (i === 0) {
                  // First button is always page 1
                  pageToShow = 1;
                } else if (i === 4) {
                  // Last button is always the last page
                  pageToShow = totalPages;
                } else if (currentPage <= 2) {
                  // Near start, show first 3 pages, then ellipsis, then last
                  pageToShow = i + 1;
                } else if (currentPage >= totalPages - 1) {
                  // Near end, show first, then ellipsis, then last 3 pages
                  pageToShow = totalPages - (4 - i);
                } else {
                  // In middle, show first, then current-1, current, current+1, then last
                  if (i === 1) {
                    return (
                      <span key={i} className="px-2 text-neutral-400">...</span>
                    );
                  } else if (i === 3) {
                    return (
                      <span key={i} className="px-2 text-neutral-400">...</span>
                    );
                  } else {
                    pageToShow = currentPage;
                  }
                }

                if (pageToShow === null) return null;

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageToShow as number)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                      currentPage === pageToShow
                        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    {pageToShow}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                "p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors",
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
              )}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;