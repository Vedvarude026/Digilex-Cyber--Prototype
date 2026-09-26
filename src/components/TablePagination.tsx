import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

interface TablePaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemName?: string;
  pageSizeOptions?: number[];
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemName = 'items',
  pageSizeOptions = [5, 10, 20, 50]
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Generate page numbers array with optional ellipses
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];
    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-[#1B1713] px-4 py-3 border-t border-[#3D332B] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
      <div className="flex flex-wrap items-center gap-3 text-slate-300">
        <span className="font-mono text-[11px]">
          Showing{' '}
          <strong className="text-white font-bold">{totalItems === 0 ? 0 : startIndex + 1}</strong> to{' '}
          <strong className="text-white font-bold">{endIndex}</strong> of{' '}
          <strong className="text-[#C5A059] font-bold">{totalItems}</strong> {itemName}
        </span>

        <div className="flex items-center gap-1.5 border-l border-[#3D332B] pl-3">
          <span className="text-slate-400 font-mono text-[11px]">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="bg-[#241E1A] text-slate-200 border border-[#3D332B] rounded px-2 py-1 font-mono text-xs focus:outline-none focus:border-[#C5A059]"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1 font-mono">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || totalItems === 0}
          className="p-1.5 rounded-lg bg-[#241E1A] hover:bg-[#3D332B] disabled:opacity-40 text-slate-300 border border-[#3D332B] transition cursor-pointer disabled:cursor-not-allowed"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || totalItems === 0}
          className="p-1.5 rounded-lg bg-[#241E1A] hover:bg-[#3D332B] disabled:opacity-40 text-slate-300 border border-[#3D332B] transition cursor-pointer disabled:cursor-not-allowed"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 px-1">
          {pageNumbers.map((page, idx) =>
            typeof page === 'number' ? (
              <button
                key={idx}
                onClick={() => onPageChange(page)}
                className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#C5A059] text-[#14100C] border border-[#C5A059]'
                    : 'bg-[#241E1A] hover:bg-[#3D332B] text-slate-300 border border-[#3D332B]'
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={idx} className="text-slate-500 px-1 font-mono select-none">
                {page}
              </span>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalItems === 0}
          className="p-1.5 rounded-lg bg-[#241E1A] hover:bg-[#3D332B] disabled:opacity-40 text-slate-300 border border-[#3D332B] transition cursor-pointer disabled:cursor-not-allowed"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalItems === 0}
          className="p-1.5 rounded-lg bg-[#241E1A] hover:bg-[#3D332B] disabled:opacity-40 text-slate-300 border border-[#3D332B] transition cursor-pointer disabled:cursor-not-allowed"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
