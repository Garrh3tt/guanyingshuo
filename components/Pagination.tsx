"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  let searchParams: URLSearchParams | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    searchParams = useSearchParams();
  } catch {
    searchParams = new URLSearchParams();
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-3 py-2 rounded-lg bg-brand-card text-gray-300 hover:bg-brand-red hover:text-white transition-colors text-sm"
        >
          上一页
        </Link>
      ) : (
        <button
          disabled
          className="px-3 py-2 rounded-lg bg-brand-card text-gray-600 cursor-not-allowed text-sm"
        >
          上一页
        </button>
      )}

      <div className="hidden sm:flex items-center gap-1">
        {getPageNumbers().map((page, idx) =>
          typeof page === "string" ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                page === currentPage
                  ? "bg-brand-red text-white"
                  : "bg-brand-card text-gray-300 hover:bg-gray-700"
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-3 py-2 rounded-lg bg-brand-card text-gray-300 hover:bg-brand-red hover:text-white transition-colors text-sm"
        >
          下一页
        </Link>
      ) : (
        <button
          disabled
          className="px-3 py-2 rounded-lg bg-brand-card text-gray-600 cursor-not-allowed text-sm"
        >
          下一页
        </button>
      )}
    </div>
  );
}
